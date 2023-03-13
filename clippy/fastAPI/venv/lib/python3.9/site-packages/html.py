# -*- encoding: utf8 -*-
#
# $Id: html.py 4869 2010-10-07 03:48:53Z rjones $
# $HeadURL: svn+ssh://svn/svn/trunk/api/eklib/html.py $
#
'''Simple, elegant HTML generation.

Constructing your HTML
----------------------

To construct HTML start with an instance of ``html.HTML()``. Add
tags by accessing the tag's attribute on that object. For example:

>>> from html import HTML
>>> h = HTML()
>>> h.br
>>> print h                          # or print(h) in python 3+
<br>

If the tag should have text content you may pass it at tag creation time or
later using the tag's ``.text()`` method (note it is assumed that a fresh
``HTML`` instance is created for each of the following examples):

>>> p = h.p('hello world!\\n')
>>> p.text('more &rarr; text', escape=False)
>>> h.p
>>> print h
<p>hello, world!
more &rarr; text</p>
<p>

Any HTML-specific characters (``<>&"``) in the text will be escaped for HTML
safety as appropriate unless ``escape=False`` is passed. Note also that the
top-level ``HTML`` object adds newlines between tags by default. Finally in
the above you'll see an empty paragraph tag - tags with no contents get no
closing tag.

If the tag should have sub-tags you have two options. You may either add
the sub-tags directly on the tag:

>>> l = h.ol
>>> l.li('item 1')
>>> l.li.b('item 2 > 1')
>>> print h
<ol>
<li>item 1</li>
<li><b>item 2 &gt; 1</b></li>
</ol>

Note that the default behavior with lists (and tables) is to add newlines
between sub-tags to generate a nicer output. You can also see in that
example the chaining of tags in ``l.li.b``. If you wished you could add
attributes to those chained tags, eg: ``l.li(id="special").b``.

The alternative to the above method is to use the containter tag as a
context for adding the sub-tags. The top-level ``HTML`` object keeps track
of which tag is the current context:

>>> with h.table(border='1'):
...   for i in range(2):
...     with h.tr:
...       h.td('column 1')
...       h.td('column 2')
...  print h
<table border="1">
<tr><td>column 1</td><td>column 2</td></tr>
<tr><td>column 1</td><td>column 2</td></tr>
</table>

Note the addition of an attribute to the ``<table>`` tag.

A variation on the above is to explicitly reference the context variable,
but then there's really no benefit to using a ``with`` statement. The
following is functionally identical to the first list construction:

>>> with h.ol as l:
...   l.li('item 1')
...   l.li.b('item 2 > 1')

You may turn off/on adding newlines by passing ``newlines=False`` or
``True`` to the tag (or ``HTML`` instance) at creation time:

>>> l = h.ol(newlines=False)
>>> l.li('item 1')
>>> l.li('item 2')
>>> print h
<ol><li>item 1</li><li>item 2</li></ol>

That control is also available as the ``newlines`` attribute on the
``HTML`` or tag instance if you need to alter it after instantiation.

Since we can't use ``class`` as a keyword, the library recognises ``klass``
as a substitute:

>>> print h.p(content, klass="styled")
<p class="styled">content</p>


Unicode
-------

``HTML`` will work with either regular strings **or** unicode strings, but
not **both at the same time**.

Obtain the final unicode string by calling ``unicode()`` on the ``HTML``
instance:

>>> h = HTML()
>>> h.p(u'Some Euro: €1.14')
>>> unicode(h)
u'<p>Some Euro: €1.14</p>'

If (under Python 2.x) you add non-unicode strings or attempt to get the
resultant HTML source through any means other than ``unicode()`` then you
will most likely get one of the following errors raised:

UnicodeDecodeError
   Probably means you've added non-unicode strings to your HTML.
UnicodeEncodeError
   Probably means you're trying to get the resultant HTML using ``print``
   or ``str()`` (or ``%s``).


How generation works
--------------------

The HTML document is generated when the ``HTML`` instance is "stringified".
This could be done either by invoking ``str()`` on it, or just printing it.
It may also be returned directly as the "iterable content" from a WSGI app
function.

You may also render any tag or sub-tag at any time by stringifying it.

Tags with no contents (either text or sub-tags) will have no closing tag.
There is no "special list" of tags that must always have closing tags, so
if you need to force a closing tag you'll need to provide some content,
even if it's just a single space character.

Rendering doesn't affect the HTML document's state, so you can add to or
otherwise manipulate the HTML after you've stringified it.


Creating XHTML
--------------

To construct XHTML start with an instance of ``html.XHTML()`` and use it
as you would an ``HTML`` instance. Empty elements will now be rendered
with the appropriate XHTML minimized tag syntax. For example:

>>> from html import XHTML
>>> h = XHTML()
>>> h.p
>>> h.br
>>> print h
<p></p>
<br />

Version History (in Brief)
--------------------------

- 1.13 allow adding (X)HTML instances (tags) as new document content
- 1.12 fix handling of XHTML empty tags when generating unicode
  output (thanks Carsten Eggers)
- 1.11 remove setuptools dependency
- 1.10 support plain ol' distutils again
- 1.9 added unicode support for Python 2.x
- 1.8 added Python 3 compatibility
- 1.7 added Python 2.5 compatibility and escape argument to tag
  construction
- 1.6 added .raw_text() and and WSGI compatibility
- 1.5 added XHTML support
- 1.3 added more documentation, more tests
- 1.2 added special-case klass / class attribute
- 1.1 added escaping control
- 1.0 was the initial release

----

This code is copyright 2009-2010 eKit.com Inc (http://www.ekit.com/)
See the end of the source file for the license of use.
XHTML support was contributed by Michael Haubenwallner.
'''
from __future__ import with_statement
__version__ = '1.13'

import unittest
import cgi


class HTML(object):
    '''Easily generate HTML.

    '''
    newline_default_on = set('table ol ul dl'.split())

    def __init__(self, name=None, stack=None, newlines=True):
        self.name = name
        self.content = []
        self.attrs = {}
        # insert newlines between content?
        if stack is None:
            stack = [self]
            self.top = True
            self.newlines = newlines
        else:
            self.top = False
            self.newlines = name in self.newline_default_on
        self.stack = stack

    def __getattr__(self, name):
        # adding a new tag or newline
        if name == 'newline':
            e = '\n'
        else:
            e = HTML(name, self.stack)
        if self.top:
            self.stack[-1].content.append(e)
        else:
            self.content.append(e)
        return e

    def text(self, text, escape=True):
        '''Add text to the document. If "escape" is True any characters
        special to HTML will be escaped.
        '''
        if escape:
            text = cgi.escape(text)
        # adding text
        if self.top:
            self.stack[-1].content.append(text)
        else:
            self.content.append(text)

    def raw_text(self, text):
        '''Add raw, unescaped text to the document. This is useful for
        explicitly adding HTML code or entities.
        '''
        return self.text(text, escape=False)

    def __call__(self, *content, **kw):
        # customising a tag with content or attributes
        escape = kw.pop('escape', True)
        if content:
            if escape:
                self.content = list(map(cgi.escape, content))
            else:
                self.content = content
        if 'newlines' in kw:
            # special-case to allow control over newlines
            self.newlines = kw.pop('newlines')
        for k in kw:
            if k == 'klass':
                self.attrs['class'] = cgi.escape(kw[k], True)
            else:
                self.attrs[k] = cgi.escape(kw[k], True)
        return self

    def __enter__(self):
        # we're now adding tags to me!
        self.stack.append(self)
        return self

    def __exit__(self, exc_type, exc_value, exc_tb):
        # we're done adding tags to me!
        self.stack.pop()

    def __repr__(self):
        return '<HTML %s 0x%x>' % (self.name, id(self))

    def stringify(self, str_type):
        # turn me and my content into text
        join = '\n' if self.newlines else ''
        if self.name is None:
            return join.join(map(str_type, self.content))
        a = ['%s="%s"' % i for i in self.attrs.items()]
        l = [self.name] + a
        s = '<%s>%s' % (' '.join(l), join)
        if self.content:
            s += join.join(map(str_type, self.content))
            s += join + '</%s>' % self.name
        return s

    def __str__(self):
        return self.stringify(str)

    def __unicode__(self):
        return self.stringify(unicode)

    def __iter__(self):
        return iter([str(self)])


class XHTML(HTML):
    '''Easily generate XHTML.

    '''

    empty_elements = set('base meta link hr br param img area input col \
        colgroup basefont isindex frame'.split())

    def __getattr__(self, name):
        # adding a new tag or newline
        if name == 'newline':
            e = '\n'
        else:
            e = XHTML(name, self.stack)
        if self.top:
            self.stack[-1].content.append(e)
        else:
            self.content.append(e)
        return e

    def stringify(self, str_type):
        # turn me and my content into text
        # honor empty and non-empty elements
        join = '\n' if self.newlines else ''
        if self.name is None:
            return join.join(map(str_type, self.content))
        a = ['%s="%s"' % i for i in self.attrs.items()]
        l = [self.name] + a
        s = '<%s>%s' % (' '.join(l), join)
        if self.content or not(self.name.lower() in self.empty_elements):
            s += join.join(map(str_type, self.content))
            s += join + '</%s>' % self.name
        else:
            s = '<%s />%s' % (' '.join(l), join)
        return s


class TestCase(unittest.TestCase):
    def test_empty_tag(self):
        'generation of an empty HTML tag'
        self.assertEquals(str(HTML().br), '<br>')

    def test_empty_tag_unicode(self):
        'generation of an empty HTML tag'
        self.assertEquals(unicode(HTML().br), u'<br>')

    def test_empty_tag_xml(self):
        'generation of an empty XHTML tag'
        self.assertEquals(str(XHTML().br), '<br />')

    def test_empty_tag_xml_unicode(self):
        'generation of an empty XHTML tag'
        self.assertEquals(unicode(XHTML().br), u'<br />')

    def test_xhtml_match_tag(self):
        'check forced generation of matching tag when empty'
        self.assertEquals(str(XHTML().p), '<p></p>')

    def test_xhtml_match_tag_unicode(self):
        'check forced generation of matching tag when empty'
        self.assertEquals(unicode(XHTML().p), u'<p></p>')

    def test_just_tag(self):
        'generate HTML for just one tag'
        self.assertEquals(str(HTML().br), '<br>')

    def test_just_tag_xhtml(self):
        'generate XHTML for just one tag'
        self.assertEquals(str(XHTML().br), '<br />')

    def test_para_tag(self):
        'generation of a tag with contents'
        h = HTML()
        h.p('hello')
        self.assertEquals(str(h), '<p>hello</p>')

    def test_escape(self):
        'escaping of special HTML characters in text'
        h = HTML()
        h.text('<>&')
        self.assertEquals(str(h), '&lt;&gt;&amp;')

    def test_no_escape(self):
        'no escaping of special HTML characters in text'
        h = HTML()
        h.text('<>&', False)
        self.assertEquals(str(h), '<>&')

    def test_escape_attr(self):
        'escaping of special HTML characters in attributes'
        h = HTML()
        h.br(id='<>&"')
        self.assertEquals(str(h), '<br id="&lt;&gt;&amp;&quot;">')

    def test_subtag_context(self):
        'generation of sub-tags using "with" context'
        h = HTML()
        with h.ol:
            h.li('foo')
            h.li('bar')
        self.assertEquals(str(h), '<ol>\n<li>foo</li>\n<li>bar</li>\n</ol>')

    def test_subtag_direct(self):
        'generation of sub-tags directly on the parent tag'
        h = HTML()
        l = h.ol
        l.li('foo')
        l.li.b('bar')
        self.assertEquals(str(h),
            '<ol>\n<li>foo</li>\n<li><b>bar</b></li>\n</ol>')

    def test_subtag_direct_context(self):
        'generation of sub-tags directly on the parent tag in "with" context'
        h = HTML()
        with h.ol as l:
            l.li('foo')
            l.li.b('bar')
        self.assertEquals(str(h),
            '<ol>\n<li>foo</li>\n<li><b>bar</b></li>\n</ol>')

    def test_subtag_no_newlines(self):
        'prevent generation of newlines against default'
        h = HTML()
        l = h.ol(newlines=False)
        l.li('foo')
        l.li('bar')
        self.assertEquals(str(h), '<ol><li>foo</li><li>bar</li></ol>')

    def test_add_text(self):
        'add text to a tag'
        h = HTML()
        p = h.p('hello, world!\n')
        p.text('more text')
        self.assertEquals(str(h), '<p>hello, world!\nmore text</p>')

    def test_add_text_newlines(self):
        'add text to a tag with newlines for prettiness'
        h = HTML()
        p = h.p('hello, world!', newlines=True)
        p.text('more text')
        self.assertEquals(str(h), '<p>\nhello, world!\nmore text\n</p>')

    def test_doc_newlines(self):
        'default document adding newlines between tags'
        h = HTML()
        h.br
        h.br
        self.assertEquals(str(h), '<br>\n<br>')

    def test_doc_no_newlines(self):
        'prevent document adding newlines between tags'
        h = HTML(newlines=False)
        h.br
        h.br
        self.assertEquals(str(h), '<br><br>')

    def test_unicode(self):
        'make sure unicode input works and results in unicode output'
        h = HTML(newlines=False)
        # Python 3 compat
        try:
            unicode = unicode
            TEST = 'euro \xe2\x82\xac'.decode('utf8')
        except:
            unicode = str
            TEST = 'euro €'
        h.p(TEST)
        self.assertEquals(unicode(h), '<p>%s</p>' % TEST)

    def test_table(self):
        'multiple "with" context blocks'
        h = HTML()
        with h.table(border='1'):
            for i in range(2):
                with h.tr:
                    h.td('column 1')
                    h.td('column 2')
        self.assertEquals(str(h), '''<table border="1">
<tr><td>column 1</td><td>column 2</td></tr>
<tr><td>column 1</td><td>column 2</td></tr>
</table>''')

if __name__ == '__main__':
    unittest.main()


# Copyright (c) 2009 eKit.com Inc (http://www.ekit.com/)
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
#  The above copyright notice and this permission notice shall be included in
#  all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.

# vim: set filetype=python ts=4 sw=4 et si

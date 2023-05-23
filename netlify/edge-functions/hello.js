 export default async(request, context) => {
    return new Response('Hello, world!', { 
        headers: {
            'content-type': 'text/plain'
        }
 })
}
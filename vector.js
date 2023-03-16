questionWords=[ 'what', 'is', 'the', 'difference', 'between', 'a', 'and', 'b' ]
articleWords=[ 'the', 'difference', 'between', 'a', 'and', 'b', 'is', 'c' ]
articleVector=[ 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8 ]

function euclideanDistance(a, b) {
    const squares = a.map((val, i) => Math.pow(val - b[i], 2));
    const sum = squares.reduce((acc, val) => acc + val, 0);
    return Math.sqrt(sum);
  }

const questionVector = questionWords.map((word) => {
    const index = articleWords.indexOf(word);
    if (index === -1) {
      return 0;
    } else {
      return articleVector[index];
    }
  });

  console.log (questionVector)

    const similarity = euclideanDistance(articleVector, questionVector);

    console.log (similarity)
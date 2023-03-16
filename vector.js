questionWords=[ 'what', 'is', 'the', 'difference', 'between', 'a', 'and', 'b' ]
articleWords=[ 'the', 'difference', 'between', 'a', 'and', 'b', 'is', 'c' ]
articleVector=[0.01648879051208496, 0.003521612612530589, 0.012298344634473324, -0.004934352822601795, -0.024187199771404266, 0.028309397399425507]

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
      const value = articleVector[index];
      return isNaN(value) ? 0 : value;
    }
  });
  
  

  console.log ("question: ", questionVector)

    const similarity = euclideanDistance(articleVector, questionVector);

    console.log (similarity)
# Example Lambda collection
------------
## Description

### Lambda List
- [getExample](#addcolocation)
- [getExamples](#synccolocation)

### Schema
```gql
type Query {
    getExample(id: Int!): Example
    getExamples(topic: String): [Example]
},

type Example {
    id: Int
    title: String
    author: String
    description: String
    topic: String
    url: String
}

```

### Lambdas
#### getExamples
**Query**

```raw
query getExample($input: String){
  getExamples(topic:$input) {
    title
    author
    description
    topic
    url
  }
}
```

**variables**
```json
{
  "input": "JavaScript"
}
```

### Input is opsional, if you not set the variables then it will return all data  

### Return Value
```json
{
  "data": {
    "getExamples": [
      {
        "title": "JavaScript: Understanding The Weird Parts",
        "author": "Anthony Alicea",
        "description": "An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.",
        "topic": "JavaScript",
        "url": "https://codingthesmartway.com/courses/understand-javascript/"
      }
    ]
  }
}
```

#### getExample
**Query**

```raw
query getExample($id:Int!) {
  getExample(id:$id){
    id
    title
    author
    description
    topic
    url
  }
}
```

**variables**
```json
{
  "id": 1
}
```

### Return Value
```json
{
  "data": {
    "getExample": {
      "id": 1,
      "title": "The Complete Node.js Developer Course",
      "author": "Andrew Mead, Rob Percival",
      "description": "Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!",
      "topic": "Node.js",
      "url": "https://codingthesmartway.com/courses/nodejs/"
    }
  }
}
```

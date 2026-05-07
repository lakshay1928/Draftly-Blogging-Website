const comments = [
  {
    _id: "c1",
    content: "This is very helpful, thank you!",
    author: "u2",
    blog: "b1",
    parentComment: null,
  },
  {
    _id: "c2",
    content: "Glad you liked it!",
    author: "u1",
    blog: "b1",
    parentComment: "c1",
  },
  {
    _id: "c3",
    content: "Can’t wait to visit Kyoto after reading this.",
    author: "u1",
    blog: "b2",
    parentComment: null,
  },
];

export default comments;

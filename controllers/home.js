module.exports = {// exports to routes/main.js
  hello: (req, res) => {
    // res.send('hello world');
    let testStr = 'whaaaaat', testBool = true
    res.render('index.ejs', {
        testStr, testBool
    })
  },
};

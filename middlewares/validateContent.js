module.exports = (req, res, next) => {
    const {title, content} = req.body;
    if(!title && title.length > 10){
        return res.status(400).json({message : "title length exceeds limit of 10 characters"});
    }

    if(!content && content.length > 50){
        return res.status(400).json({message : "content length exceeds limit of 50 characters"});
    }
    next();
} 
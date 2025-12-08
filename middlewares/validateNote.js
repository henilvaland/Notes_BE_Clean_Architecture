module.exports = (req, res, next) => {
    const {title, content} = req.body;
    if(!title || title.trim() === ''){
        return res.status(400).json({message : "title is required"});
    }

    if(!content || content.trim() === ''){
        return res.status(400).json({message : "content is required"});
    }
    next();
} 
export const testPostController = (req, res) => {
    const { name } = req.body;//req.body ke json format se we will get the name means name is send in json format in postman
    res.status(200).send(`Your name is ${name}`);
}
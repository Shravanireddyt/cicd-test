const mailgun = require("mailgun-js");


const DOMAIN = "mail.takeoff.in";
const mg = mailgun({
    apiKey: process.env.MAILGUN_APIKEY,
    domain: DOMAIN,
});

exports.sendMail = async(data) => {
    // FIXME: updated from mail and content, change text
    const dataMail = {
        from: "TAKEOFF <support@mail.takeoff.in>",
        to: `<${data.email}>`,
        subject: `${data.title}`,
        html: `
        <strong>This is for testing purpose only. DON'T PANIC🤣</strong>
        <div>
            <strong>${data.title}</strong><br><br>
            <strong>${data.description}</strong><br>
            <strog>FIELDS : ${data.fields}</strong><br>
            <strong>URL : </strong><a href='${data.url}'>OPEN</a>
        </div>
        `,
    };
    return new Promise((resolve, reject) => {
        mg.messages().send(dataMail, function(error, body) {
            if (error) {
                reject(error)
            }
            console.log("Alert raised, Main sent successfully.")
            resolve(error)
        });
    })
};
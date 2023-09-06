
// Aller chercher les configurations de l'application
import 'dotenv/config';

// Importer les fichiers et librairies
import express, { json, urlencoded } from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import cspOption from './csp-options.js'
import nodemailer from 'nodemailer';



// Création du serveur
const app = express();

// Ajout de middlewares
app.use(helmet(cspOption));
app.use(compression());
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));


app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;
    console.log('name', name);
    console.log('email', email);
    console.log('message', message);


    const transporter = nodemailer.createTransport({
        service: 'Gmail', // Utilisez le service que vous préférez

        auth: {
            user: "portfolioh415@gmail.com",
            pass: "gcwyhwsupxqrqwuc"
        }

    });
    

    const mailOptions = {
        from: "portfolioh415@gmail.com",      // Adresse e-mail de l'expéditeur
        to: "portfolioh415@gmail.com",
        subject: 'Nouveau message de votre formulaire de contact',
        text: `Nom: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };
    console.log('message', mailOptions.text);

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Une erreur est survenue lors de l\'envoi de l\'e-mail.');
        } else {
            console.log('E-mail envoyé : ' + info.response);
            res.status(200).send('E-mail envoyé avec succès !');
        }
    });
});





// Renvoyer une erreur 404 pour les routes non définies
app.use(function (request, response) {
    // Renvoyer simplement une chaîne de caractère indiquant que la page n'existe pas
    response.status(404).send(request.originalUrl + ' not found.');
});

// Démarrage du serveur
app.listen(process.env.PORT);
console.info(`Serveurs démarré:`);
console.info(`http://localhost:${process.env.PORT}`);
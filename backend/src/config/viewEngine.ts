import path from 'path';
import express, { Application } from 'express';

const configViewEngine = (app: Application): void => {
    //config static files
    app.use(express.static(path.join(__dirname, '../public')));
}

export default configViewEngine;
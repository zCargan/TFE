const { Client } = require('pg');
const express = require('express');
const multer = require('multer');
const path = require('path');
const pgp = require('pg-promise')();

exports.testRoute = (req, res, next) => {
    console.log("On est solicité")
}
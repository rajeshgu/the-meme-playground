import nodemailer from 'nodemailer'

const  transpoter = nodemailer.createTransport({
   port: ''
})


export default transpoter
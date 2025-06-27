import fs from 'fs'

fs.appendFile('my-file.txt', 'File is created', (err) => {
    if(err) throw err
    console.log('File is saved');

})

setTimeout(() => {
    console.log('Fff')
}
, 10000)
// import fs from 'fs'
import ffi from 'ffi'

const libm = ffi.Library(
    './src/renderer/utils/libvideo.dylib',
    {
        'sound_identify': ['void', ['uint32', 'string', 'string', 'string', 'bool']]
    }
)
// const sleep = (time) => new Promise(resolve => setTimeout(resolve, time))
export const algorithm = async (arg) => {
    libm.sound_identify(+new Date() / 1000, '1', '2', '3', false)
    // let files = fs.readdirSync(arg.inputPath)
    // await sleep(2000)
    // files.forEach(item => {
    //     fs.readFile(arg.inputPath + '/' + item, (err, data) => {
    //         if (err) {
    //             console.log(err)
    //         } else {
    //             let index = 0
    //             let max = Math.ceil(data.length / (1024 * 32))
    //             for (let i = 0; i < max; i++) {
    //                 let chunk = data.slice(index, (i + 1) * 1024 * 24)
    //                 index = i * 1024 * 24
    //                 console.log(chunk)
    //                 if (i === 0) {
    //                     libm.sound_identify(Math.floor(+new Date() / 1000), chunk, `${__dirname}/configFile`, arg.outputPath, false)
    //                 } else if (i === max) {
    //                     console.log(2)
    //                     libm.sound_identify(0, chunk, `${__dirname}/configFile`, data.outputPath, true)
    //                 } else {
    //                     console.log(3)
    //                     libm.sound_identify(0, chunk, `${__dirname}/configFile`, data.outputPath, false)
    //                 }
    //             }
    //         }
    //     })
    // })
}

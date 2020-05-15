import fs from 'fs'
import ffi from 'ffi'
import path from 'path'
import FFmpeg from 'fluent-ffmpeg'
const Lame = require('node-lame').Lame

const defaultPath = path.join(__dirname, '../')
const libm = ffi.Library(
    `${__dirname}/libsleep.dylib`,
    {
        'sound_identify': ['void', ['uint32', 'string', 'string', 'string', 'bool']]
    }
)

// 算法函数
const algorithm = async (buf, arg, fileName) => {
    return new Promise(resolve => {
        console.log(defaultPath)
        console.log(arg)
        // configFile 文件的绝对路径
        let address = `${__dirname}/configFile/`
        console.log(address)
        // 输出文件夹生成音频单个文件夹
        const newDirPath = `${arg.outputPath}/${fileName}`
        if (!fs.existsSync(newDirPath)) {
            fs.mkdirSync(newDirPath)
            fs.mkdirSync(newDirPath + '/sleep')
        }
        let outputPath = `${newDirPath}/sleep/`

        let max = Math.ceil(buf.length / (1024 * 32))
        for (let i = 0; i < max; i++) {
            let chunk = buf.slice(i * 1024 * 32, (i + 1) * 1024 * 32)

            if (i === 0) {
                libm.sound_identify(Math.floor(+new Date() / 1000),
                    chunk,
                    address,
                    outputPath,
                    false)
            } else if (i === max - 1) {
                libm.sound_identify(
                    0,
                    chunk,
                    address,
                    outputPath,
                    true)
                resolve()
            } else {
                libm.sound_identify(
                    0,
                    chunk,
                    address,
                    outputPath,
                    false)
            }
        }
    })
}

// mp3 转 wav
const ffmpeg = (filePath, fileName, arg) => {
    return new Promise((resolve) => {
        FFmpeg(`${filePath}/${fileName}.mp3`)
            .output(`${filePath}/${fileName}.wav`)
            .withAudioFrequency(16000)
            .on('error', function (err) {
                console.log('An error occurred: ' + err.message)
            })
            .on('end', async () => {
                console.log('Processing finished !')
                // 执行lame 函数，wav 转 Buffer
                await lame(filePath, fileName, arg, 'wav', true)
                resolve()
            })
            .run()
    })
}

// 格式 wav / pcm 转 Buffer
const lame = (filePath, fileName, arg, type, isDelete) => {
    return new Promise((resolve) => {
        const encoder = new Lame({
            'output': 'buffer',
            'disable-info-tag': true
        }).setFile(`${filePath}/${fileName}.${type}`)

        encoder
            .decode()
            .then(async () => {
                const buffer = encoder.getBuffer()
                console.log(buffer.length)
                // 删除新生成的wav文件
                if (isDelete) {
                    fs.unlinkSync(`${filePath}/${fileName}.${type}`)
                }
                await algorithm(buffer, arg, fileName)
                resolve()
            })
            .catch((error) => {
                // Something went wrong
                console.log(error)
            })
    })
}

export const running = async (arg) => {
    const files = fs.readdirSync(arg.inputPath)
    console.log(files)

    await files.map(async item => {
        if (/\.mp3/.test(item)) {
            let fileName = item.replace(/\.mp3/, '')
            console.log(item)
            await ffmpeg(arg.inputPath, fileName, arg)
        } else if (/\.wav/.test(item)) {
            let fileName = item.replace(/\.wav/, '')
            console.log(item)
            await lame(arg.inputPath, fileName, arg, 'wav')
        } else if (/\.pcm/.test(item)) {
            let fileName = item.replace(/\.pcm/, '')
            await lame(arg.inputPath, fileName, arg, 'pcm')
        }
    })
}

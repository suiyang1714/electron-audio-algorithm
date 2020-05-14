<template>
    <div class="page">
        <div class="main">
            <Form :model="formData"  label-width="120px">
                <FormItem label="输入音频文件夹">
                    <Input v-model="formData.inputPath" :readonly="true" />
                    <Button type="primary" size="small" @click="onSettingInputPath">浏览</Button>
                </FormItem>
                <FormItem label="输出音频文件夹">
                    <Input v-model="formData.outputPath" :readonly="true" />
                    <Button type="primary" size="small" @click="onSettingOutputPath">浏览</Button>
                </FormItem>
                <FormItem>
                    <Button type="primary" size="small" @click="onCompileFile">执行</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
    import {Form, FormItem, Input, Button} from 'element-ui'
    import {remote, ipcRenderer} from 'electron'
    export default {
        name: 'index',
        components: {
            Form, FormItem, Input, Button
        },
        data () {
            return {
                formData: {
                    inputPath: '',
                    outputPath: ''
                }
            }
        },
        mounted () {

        },
        methods: {
            onSettingInputPath () {
                const dialog = remote.dialog
                const selectPath = dialog.showOpenDialog({ properties: ['openFile', 'openDirectory', 'createDirectory'] })
                console.log(selectPath)
                if (selectPath) {
                    this.formData.inputPath = selectPath[0]
                }
            },
            onSettingOutputPath () {
                const dialog = remote.dialog
                const selectPath = dialog.showOpenDialog({ properties: ['openFile', 'openDirectory', 'createDirectory'] })
                console.log(selectPath)
                if (selectPath) {
                    this.formData.outputPath = selectPath[0]
                }
            },
            onCompileFile () {
                ipcRenderer.send('onCompileFile', {
                    ...this.formData
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .main {
        width: 600px;
        .el-input {
            width: 300px;
            margin-right: 20px;
        }
    }
</style>

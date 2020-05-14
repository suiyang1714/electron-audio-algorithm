<template>
    <div>
        <Menu
                :default-active="active"
                :router="true"
                class="el-menu-vertical-demo"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
            <MenuItem index="1" route="/">
                <i class="el-icon-menu"></i>
                <span slot="title">创建实例</span>
            </MenuItem>
            <MenuItem index="2" route="/set">
                <i class="el-icon-setting"></i>
                <span slot="title">配置</span>
            </MenuItem>
        </Menu>
    </div>
</template>

<script>
    import {Menu, MenuItem} from 'element-ui'

    export default {
        name: 'asideMenu',
        components: {
            Menu, MenuItem
        },
        data () {
            return {
                active: '1'
            }
        },
        created () {
            console.log(this.$route)
            switch (this.$route.path) {
                case '/':
                    this.active = '1'
                    break
                case '/set':
                    this.active = '2'
                    break
            }
        },
        methods: {

        }
    }
</script>

<style scoped>

</style>

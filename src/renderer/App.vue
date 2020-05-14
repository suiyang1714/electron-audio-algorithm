<template>
    <div id="app">
        <Container direction="vertical" style="height: 100vh;">
            <Header>蜗牛睡眠音频算法实验平台</Header>
            <Container>
                <Aside width="200px"><AsideMenu /></Aside>
                <Container direction="vertical">
                    <Main>
                        <router-view></router-view>
                    </Main>
                    <Footer>By Aditya</Footer>
                </Container>
            </Container>
        </Container>
    </div>
</template>

<script>
    import AsideMenu from './components/asideMenu'
    import {Aside, Container, Footer, Header, Main} from 'element-ui'

    export default {
        name: 'App',
        components: {
            Container, Header, Main, Aside, Footer, AsideMenu
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
    }
</style>

var app = new Vue({
    el: "#ct",
    data: {
        query: "",
        music: [],
        musrcUrl: "",
        musicC: "",
        hotComments: [],
        isPlaying: false,
        isShow: false,
        mvUrl: ""
    },
    methods: {
        searchs: function () {
            var that = this;
            axios.get("https://autumnfish.cn/search?keywords=" + this.query).then(function (response) {
                // console.log(response);
                that.music = response.data.result.songs
            }, function (err) { })
        },
        // 歌曲播放按钮
        playM: function (muid) {
            var that = this;
            // 获取歌曲地址
            axios.get("https://autumnfish.cn/song/url?id=" + muid).then(function (response) {
                that.musrcUrl = response.data.data[0].url;
            }, function (err) { })
            // 获取歌曲详情图片
            axios.get("https://autumnfish.cn/song/detail?ids=" + muid).then(function (response) {
                // console.log(response.data.songs[0].al.picUrl);
                that.musicC = response.data.songs[0].al.picUrl;

            }, function (err) { })
            // 歌曲评论以及作者
            axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + muid).then(function (response) {
                console.log(response.data.hotComments);
                that.hotComments = response.data.hotComments
            }, function (err) { })
            // 

        },
        // 搜索 渲染页面
        searM: function () {
            this.searchs();
        },
        // 歌曲动画播放
        play: function () {
            // console.log("play");
            this.isPlaying = true;
        },
        pause: function () {
            // console.log("pause");
            this.isPlaying = false;
        },
        playMv: function (mvid) {
            var that = this;
            axios.get("https://autumnfish.cn/mv/url?id=" + mvid).then(function (response) {
                // console.log(response.data.data.url);
                that.isShow = true;
                that.mvUrl = response.data.data.url
            }, function () {

            })
        },
        hidden: function () {
            this.$refs.video.pause();
            this.isShow = false;

        }

    }


})
// https://autumnfish.cn/search

// 获取歌曲的接口 https://autumnfish.cn/song/url
// https://autumnfish.cn/song/detail
// https://autumnfish.cn/comment/hot?type=0
// https://autumnfish.cn/mv/url
// 需要传递id!!!!
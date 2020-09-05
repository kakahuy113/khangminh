- Chạy "npm install" để cài các package cần thiết

- Để bắt đầu môi trường dev, chạy "npm start" 


-------------------------------------------------------


- Thêm các thư viện front-end bằng file "_vendor.json"

- Nếu sử dụng google map thì vào node_modules > @Type > googlemaps add dòng declare module "googlemaps"
- Nếu thêm 1 file ts chỉ sử dụng cho một số trang đặc biệt thì vào _Task > Serve.js thêm
const watchTypescriptNew = () => {
    return MainBuild(_).tsBrowserifyNew();
};
function tsBrowserifyNew() {
    return _.browserify({
        basedir: ".",
        debug: true,
        entries: ["src/scripts/GoogleMapController.ts"],
        cache: {},
        packageCache: {},
    })
        .plugin(_.tsify)
        .transform("babelify", {
            presets: ["@babel/env"],
            plugins: [
                "@babel/plugin-proposal-class-properties",
                "@babel/plugin-proposal-async-generator-functions",
            ],
            extensions: [".ts", ".js"],
        })
        .bundle()
        .on("error", function (err) {
            console.error(err.toString());
            this.emit("end");
        })
        .pipe(_.source("GoogleMapController.min.js"))
        .pipe(_.buffer())
        .pipe(_.sourcemaps.init({ loadMaps: true }))
        .pipe(_.uglify())
        .pipe(_.sourcemaps.write("./"))
        .pipe(_.gulp.dest("dist/js"));
}
const gulp = require("gulp");
const nodemon = require("gulp-nodemon");
const rename = require("gulp-rename");
const sequence = require("gulp-sequence");
const sourcemaps = require("gulp-sourcemaps");
const ts = require("@notadd/gulp-typescript");
const tslint = require("gulp-tslint");

const packages = {
    core: ts.createProject("src/core/tsconfig.json"),
    graphql: ts.createProject("src/graphql/tsconfig.json"),
    restful: ts.createProject("src/restful/tsconfig.json"),
    server: ts.createProject("src/server/tsconfig.json"),
};

const dist = "packages";
const source = "src";

const modules = Object.keys(packages);

gulp.task("default", function () {
    tasks();
    nodemon({
        script: "starter/bootstrap.js",
        watch: [
            "packages/",
            "starter/",
        ],
        ext: "js"
    });
});

modules.forEach(module => {
    gulp.task(module, () => {
        let target = `${dist}/${module}`;
        if (module === "server") {
            target = "starter";
        }

        return packages[module]
            .src()
            .pipe(tslint({
                formatter: "verbose",
            }))
            .pipe(tslint.report({
                emitError: false,
                summarizeFailureOutput: true,
            }))
            .pipe(sourcemaps.init())
            .pipe(packages[module]())
            .pipe(sourcemaps.write("."))
            .pipe(gulp.dest(target));
    });
});

gulp.task("build", function (cb) {
    sequence("core", modules.filter((module) => module !== "core"), cb);
});

function tasks() {
    modules.forEach(module => {
        watchTypescript(source, module);
    });
}

function watchTypescript(source, module) {
    gulp.watch(
        [
            `${source}/${module}/**/*.ts`,
            `${source}/${module}/**/*.tsx`,
            `${source}/${module}/*.ts`,
            `${source}/${module}/*.tsx`,
        ],
        [
            module,
        ]
    ).on("change", function (event) {
        console.log("File " + event.path + " was " + event.type + ", running tasks...");
    });
}

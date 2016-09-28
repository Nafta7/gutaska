import uglify from 'gulp-uglify'
import rename from 'gulp-rename'

module.exports = function(gulp, paths, $){
  function minifyJS(cb){
    if (!paths.scripts) {
      $.gutil.log(`[${compileJSES6.displayName}] Warning: `
        + `task did not complete because script paths are not defined.`)
      cb()
      return
    }

    $.gutil.log(`[${minifyJS.displayName}] `
      + `Minifying js from: ${paths.scripts.dest}`)
    let dest = paths.scripts.dest
    let match = paths.scripts.glob || '**/*'
    match += '.js'
    match = $.path.join(dest, match)
    const pathJSMap = $.path.join(dest, '*.js.map')
    const pathJSMin = $.path.join(dest, '*.min.js')
    const ignore = `!(${pathJSMap}|${pathJSMin})`

    var stream = gulp.src([match, ignore])
      .pipe(rename(function(path){
        path.basename += '.min'
      }))
      .pipe(uglify())
      .pipe(gulp.dest(paths.scripts.dest))

    return stream
  }

  minifyJS.displayName = 'minify:js'
  return minifyJS
}
for (let i = 1; i <= 24; i++) {

    try {
        let day_exercise = require('./day#/day#'.replace(/#/g, i));
        day_exercise.run();
    } catch (error) {
        break;
    }
}
export default (to, from, next) => {
    const token = localStorage.getItem('token');
    if (token) {
        next({ name: 'activities' });
    } else {
        next();
    }
}
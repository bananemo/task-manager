const Container = require('typedi').Container

module.exports = async (models, services) => {
    try {
        await models.forEach(m => {
            Container.set(m.name, m.model);
        });

        await services.forEach(s => {
            Container.set(s.name, new s.service());
        });
    } catch (e) {
        
    }
}
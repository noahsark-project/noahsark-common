function BaseDAO(MongooseModel) {
    if (!MongooseModel) {
        throw new Error('Argument MongooseModel can not be empty');
    }
    this.Model = MongooseModel;
    this.create = async function (obj) {
        try {
            const model = new this.Model(obj);
            let savedObj = await model.save();
            return savedObj;
        } catch (err) {
            throw (err);
        }
    };
    this.update = async function (_id, obj) {
        try {
            const obj = await this.Model.findByIdAndUpdate(_id, obj).exec();
            return obj;
        } catch (err) {
            throw (err);
        }

    };
    this.remove = async function (_id) {
        try {
            const result = await this.Model.findByIdAndDelete(_id).exec();
            return result;
        } catch (err) {
            throw (err);
        }
    };
    this.findOne = async function (query) {
        try {
            const obj = await this.Model.findOne(query).exec();
            return obj;
        } catch (err) {
            throw (err);
        }

    };
    this.find = async function (query) {
        if (!query) {
            query = {};
        }
        try {
            const objs = await this.Model.find(query).exec();
            return objs;
        } catch (err) {
            throw (err);
        }
    };

    this.isExisted = async function (field, value) {
        if(!field){
            return false;
        }
        let query = {};
        let fieldType = this.Model.schema.paths[field].instance;
        if(fieldType === 'Array'){
            query[field] = {'$elemMatch':{'$eq':value}};
        }else{
            query[field] = value;
        }
        try {
            const result = await this.find(query);
            if (result && result.length > 0) {
                return true;
            }
            return false;
        } catch (err) {
            throw (err);
        }
    };
}
module.exports = BaseDAO;
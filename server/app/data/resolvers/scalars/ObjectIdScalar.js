import {GraphQLScalarType} from 'graphql';
import {Kind} from 'graphql/language';
const ObjectId = require('mongodb').ObjectId;

export default new GraphQLScalarType({
    name: 'ObjectId',
    description: 'Returns a mongodb ObjectId format',
    serialize(value) {
        if (typeof value === 'string') {
            return new ObjectId(value);
        }
        return null;
    },
    parseValue(value) {
        if (typeof value === 'string') {
            return new ObjectId(value);
        }
        return null;
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.STRING) {
            return new ObjectId(value);
        }
        return null;
    },
});

const path = require('path');

module.exports = {
    resolve: {
        alias: {
            'components': path.resolve(__dirname, 'src/components'),
            'pages': path.resolve(__dirname, 'src/pages'),
            'assets': path.resolve(__dirname, 'src/assets'),
            'utils': path.resolve(__dirname, 'src/utils')
        },
        extensions: ['.jsx', '.js', '.scss', '.json'],
    },
};

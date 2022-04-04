module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'ef8b11ddea3c85e57cc9a4e905d0ee68'),
  },
});

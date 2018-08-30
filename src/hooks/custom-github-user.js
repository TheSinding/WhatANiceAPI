// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
  return async context => {
    const { data, params } = context;

    if (!params.oauth) return context;

    const provider = params.oauth.provider || 'none';

    if (provider !== 'github') return context;

    const { profile } = data.github;

    const names = profile.displayName.split(' ');

    const primaryEmail = profile.emails.find(email => email.primary === true);

    const user = {
      photos: profile.photos,
      providerMetadata: profile._json,
      email: primaryEmail.value,
      verified: true
    };

    Object.assign(data, { ...user });

    return context;
  };
};

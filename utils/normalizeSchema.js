import { Orbis } from "@orbisclub/orbis-sdk";
import Passport from "@krebitdao/reputation-passport";

// types

export const profile = async (props) => {
  let { orbis, passport, did, reputation = 0 } = props;
  let currentProfile;
  let orbisMetadata;

  if (passport) {
    did = passport.did;
    reputation = await passport.getReputation();
  }

  const orbisProfile = await orbis.getProfile(did);
  orbisMetadata = orbisProfile?.data;

  if (orbisProfile?.data?.did) {
    currentProfile = {
      did,
      background: orbisProfile?.data?.details?.profile?.cover,
      picture: orbisProfile?.data?.details?.profile?.pfp || "",
      name:
        orbisProfile?.data?.details?.profile?.username ||
        orbisProfile?.data?.details?.metadata?.ensName,
      description: orbisProfile?.data?.details?.profile?.description,
      reputation: reputation || 0,
      countFollowers: orbisProfile?.data?.count_followers || 0,
      countFollowing: orbisProfile?.data?.count_following || 0,
      orbisMetadata,
    };
  } else {
    currentProfile = {
      did,
      background: undefined,
      picture: "",
      name: did.match(Passport.utils.regexValidations.address)[0] || "",
      description: undefined,
      reputation: reputation || 0,
      countFollowers: 0,
      countFollowing: 0,
      orbisMetadata,
    };
  }

  return currentProfile;
};

export const normalizeSchema = {
  profile,
};

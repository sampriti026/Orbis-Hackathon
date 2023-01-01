const getClaim = async (toAddress) => {
  const badgeValue = {
    entity: "My Community",
    name: "Community Badge Name",
    imageUrl: "ipfs://the-badge-image-url",
    description: "Badge for recipient that meet some criteria",
    skills: [{ skillId: "participation", score: 100 }],
    xp: 10,
  };

  const expirationDate = new Date();
  const expiresYears = 3;
  expirationDate.setFullYear(expirationDate.getFullYear() + expiresYears);
  console.log("expirationDate: ", expirationDate);

  return {
    id: `badge-123`,
    ethereumAddress: toAddress,
    did: `did:pkh:eip155:1:${toAddress}`,
    type: "Badge",
    value: badgeValue,
    tags: ["Community"],
    typeSchema: "krebit://schemas/badge",
    expirationDate: new Date(expirationDate).toISOString(),
  };
};

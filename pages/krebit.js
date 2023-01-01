import { useContext, useEffect, useState } from "react";

import { GeneralContext } from "../context";

const Krebit = () => {
  const { auth, walletInformation, profileInformation } = useContext(GeneralContext);

  const [recipient, setRecipient] = useState("");
  const [issuedCredentialId, setIssuedCredentialId] = useState("");
  const [receivedCredentialId, setReceivedCredentialId] = useState("");
  const [addedCredentialId, setAddedCredentialId] = useState("");
  const [credentials, setCredentials] = useState([]);

  useEffect(() => {
    if (!walletInformation) return;
    if (auth.status !== "resolved") return;
  }, [auth, walletInformation]);

  const newRecipient = (event) => {
    event.preventDefault();
    setRecipient(event.target.value);
  };

  const newReivedCredentialId = (event) => {
    event.preventDefault();
    setReceivedCredentialId(event.target.value);
  };
  const initialCredential = {
    values: {
      rating: 2,
      review: "nice product"
    },
    entity: 'Personal',
    description: "Product or Pitch Review",
    credentialType: 'Product Review',
    credentialSchema: 'krebit://schemas/recommendation',
  };

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
      value: initialCredential,
      tags: ["Community"],
      typeSchema: "krebit://schemas/recommendation",
      expirationDate: new Date(expirationDate).toISOString(),
    };
  };

  const issueCredential = async () => {
    const claim = await getClaim(recipient);
    const issuedCredential = await walletInformation.issuer.issue(claim);

    console.log("Issued credential:", issuedCredential);

    console.log(
      "Verifying credential:",
      await walletInformation.issuer.checkCredential(issuedCredential)
    );

    const credentialId = await walletInformation.passport.addIssued(
      issuedCredential
    );
    setIssuedCredentialId(credentialId);
  };

  const getIssued = async () => {
    const credentials = await walletInformation.passport.getIssued();
    setCredentials(credentials);
  };

  const addCredential = async () => {
    const credential = await walletInformation.passport.getCredential(
      receivedCredentialId
    );
    const credentialId = await walletInformation.passport.addCredential(
      credential
    );
    console.log("Added credential:", credentialId);
    setAddedCredentialId(credentialId);
  };

  const getMyCredentials = async () => {
    const credentials = await walletInformation.passport.getCredentials();
    setCredentials(credentials);
  };

  if (auth.status !== "resolved") {
    return <div>Krebit is loading</div>;
  }

  if (auth?.isAuthenticated) {
    return (
      <>
        <div>username: {profileInformation.profile.name}</div>
        <div>address: {profileInformation.profile.did}</div>
        <h1>Issuer</h1>
        <div>
          <input
            name="recipient"
            value={recipient}
            placeholder="Issue To Address"
            onChange={newRecipient}
          />
          <button onClick={issueCredential}>Issue</button>
          <br />
          Issued Credential: {issuedCredentialId}
        </div>
        <button onClick={getIssued}>Get Issued</button>
        <br />
        <h1>Recipient</h1>
        <div>
          <input
            name="receivedCredentialId"
            value={receivedCredentialId}
            placeholder="ceramic:// url"
            onChange={newReivedCredentialId}
          />
          <button onClick={addCredential}>
            Add received credential to my passport
          </button>
          <br />
          Added Credential: {addedCredentialId}
        </div>
        <button onClick={getMyCredentials}>Get Collected Credentials</button>
        <br />
        Credentials:
        <ol>
          {credentials.map((credential) => (
            <li key={credential}>{JSON.stringify(credential)}</li>
          ))}
        </ol>
      </>
    );
  }

  return <button onClick={() => auth.connect()}>connect</button>;
};

export default Krebit;

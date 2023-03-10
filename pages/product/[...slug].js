import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { GeneralContext } from "../../context";
import { Orbis } from "@orbisclub/orbis-sdk";
import { Player, useAsset } from "@livepeer/react";
import { ethers } from "ethers";
import crowdfunding from "../../contract/crowdfunding.json";
import { bytecode } from "../../contract/bytecode";
import ProgressBar from "../../components/progressbar";
import { normalizeSchema } from "../../components/normalizeSchema";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ProductPage() {
  const { auth, walletInformation, profileInformation } =
    useContext(GeneralContext);
  const router = useRouter();
  let { slug } = router.query;
  let orbis = new Orbis();

  // rest of component code

  const [product, setProduct] = useState();
  const [recipient, setRecipient] = useState("");
  const [issuedCredentialId, setIssuedCredentialId] = useState("");
  const [receivedCredentialId, setReceivedCredentialId] = useState("");
  const [addedCredentialId, setAddedCredentialId] = useState("");
  const [credentials, setCredentials] = useState([]);
  const [reviewValues, setReviewValues] = useState();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [toAddress, setToAddress] = useState();
  const [showInputs, setShowInputs] = useState(false);
  const [targetAmount, setTargetAmount] = useState();
  const [days, setDays] = useState();
  const [body, setBody] = useState();
  const [contractAddress, setContractAddress] = useState();
  const [contractPost, setContractPost] = useState([]);
  const [amount, setAmount] = useState();
  const [current, setCurrent] = useState();
  const [total, setTotal] = useState();
  const [end, setEnd] = useState();
  const [show, setShow] = useState(true);
  const [master, setMaster] = useState();
  let deadline;

  function getPublicKeyFromDid(did) {
    // Get the length of the input string
    const inputStringLength = did.length;
    // Calculate the start index for the slice by subtracting 42 from the length of the input string
    const startIndex = inputStringLength - 42;
    // Slice the last 42 characters from the input string
    const last42Characters = did.slice(startIndex);
    return last42Characters; // logs "0123456789abcdefghijklmnopqrstuvwxyz0123456789"
  }

  let address;

  const shortenAddress = (address) =>
    `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;

  const getClaim = async () => {
    const review = {
      reviewValues,
      rating,
      entity: "Product Review",
      name: "Product Review",
      description: "Product Review",
    };

    const expirationDate = new Date();
    const expiresYears = 3;
    expirationDate.setFullYear(expirationDate.getFullYear() + expiresYears);
    console.log("expirationDate: ", expirationDate);

    return {
      id: `review-123`,
      ethereumAddress: toAddress,
      did: `did:pkh:eip155:1:${toAddress}`,
      type: master,
      value: review,
      tags: ["Product"],
      typeSchema: "krebit://schemas/recommendation",
      expirationDate: new Date(expirationDate).toISOString(),
    };
  };

  const issueCredential = async () => {
    const claim = await getClaim(toAddress);
    console.log(walletInformation);

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
    await getIssued();
  };

  const getIssued = async () => {
    console.log("Wallet", walletInformation);
    const reviews = await walletInformation.passport.getIssued(master);
    console.log(reviews);
    if (!reviews) {
      alert("No reviews found");
    }
    let data = [];
    if (reviews.length > 0) {
      data = await Promise.all(
        reviews.map(async (review) => {
          const values = JSON.parse(review.credentialSubject.value);
          console.log(review.id);

          const profile = await normalizeSchema.profile({
            orbis: walletInformation?.orbis,
            did: review.issuer.id,
            reputation: 0,
          });

          return {
            picture: profile.picture,
            name: profile.name,
            did: profile.did,
            reputation: profile.reputation,
            streamId: review.id,
            review: {
              rating: parseInt(values.rating, 10) || 0,
              reviewValues: values.reviewValues,
            },
          };
        })
      );
    }
    console.log(data);
    setCredentials(data);
  };
  let papa;
  const getPost = async () => {
    if (slug && slug.length > 1) {
      // rest of component code

      let { data, error } = await orbis.getPost(slug[0]);
      if (!error) {
        setProduct(data);
        const address = getPublicKeyFromDid(data.creator);
        setToAddress(address);
        console.log("og", data.stream_id);
        papa = data.stream_id
        setMaster(data.stream_id);
        const did = data.creator;
        getContract(papa);
      } else {
        console.log(error);
      }
    }
  };

  const getContract = async (master) => {
    console.log("papa real", papa)
    let { data, error } = await orbis.getPosts({
      context: master
    });
    
    console.log(data, "GetContract data");
    if (data.length !== 0) {
      console.log("no error, should come only when the contract was launched")
      setShow(false);
      console.log(data[0].content.data);
      setContractPost(data[0]);
      address = await data[0].content.data.contractAddress;
      console.log(data[0].content.data.contractAddress, "add");

      getTotal();
    } else {
      console.log("error should come only when the contract was not launched")
      setShow(true);
      console.log(error);
    }
    return{
      address
    }
  };

  const contribute = async () => {
    address = await getContract(master)
    console.log(address.address, "contri address")
    try {
      const { ethereum } = window;
      console.log(address);
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          address.address,
          crowdfunding.abi,
          signer
        );

        let Txn = await connectedContract.contribute({
          value: ethers.utils.parseEther(amount),
        });
        await Txn.wait();
        console.log(`Contribute, see transaction: ${Txn.hash}`);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function getTotal() {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(address, crowdfunding.abi, signer);
        // Call the contract method that returns the value of the public variable
        const value = await contract.functions["totalAmount"]();
        const numberValue = value[0].toNumber();
        const ethValue = ethers.utils.formatEther(numberValue);
        setCurrent(ethValue);
        console.log(ethValue, "ethVA");

        const target = await contract.functions["targetAmount"]();
        const targetValue = target[0].toNumber();
        setTotal(targetValue);
        console.log(targetValue, "targetValue");

        const time = await contract.functions["deadline"]();
        const timeValue = time[0].toNumber();
        const timestamp = new Date(timeValue * 1000);
        const timeString = timestamp.toLocaleString("en-US");

        setEnd(timeString);
        console.log(end, "end");

        // if (value instanceof ethers.BigNumber) {
        //   // Convert the BigNumber object to a JavaScript number
        //   const numberValue = value.toNumber();
        //   console.log(numberValue);
        // } else {
        //   console.log(value);
        // }
      } else {
        onsole.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function post(contractAddress) {
    await orbis.isConnected();

    console.log(body, master, contractAddress, "body, papa, contractAddress")
    let res = await orbis.createPost({
      body: body,
      context: master,
      data: { contractAddress: contractAddress },
      
    });

    console.log("res", res.stream_id);
    if (res.status !== 200) {
      alert("Failed to create post");
    }
    if(res.status == 200){
      alert("Success! The contract will be loaded soon")
    } 
  getContract(master) }

  const random = () => {
    console.log(body, master, "body, papa, contractAddress")
  }

  useEffect(() => {
    getPost();

    // setTimeout(() => {
    //   Fetchvdo();
    // }, 5000);
  }, []);

  useEffect(() => {
    if (!walletInformation) return;
    if (auth.status !== "resolved") return;
  }, [auth, walletInformation]);

  const newRecipient = (event) => {
    event.preventDefault();
    setRecipient(event.target.value);
  };

  // const { data: asset } = useAsset(slug[1]);
  const videoAsset = useAsset(
    slug && slug.length > 1 ? { assetId: slug[1] } : { assetId: "" }
  );

  if (!product) {
    return (<p>Loading...</p>)
    ;
  }

  const daysToSeconds = () => {
    deadline = days * 86400
  };



  const startFund = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const factory = new ethers.ContractFactory(
          crowdfunding.abi,
          bytecode,
          signer
        );
        daysToSeconds();
        const contract = await factory.deploy(targetAmount, deadline);
        await contract.deployed();
        console.log("Contract Address:", contract.address);
        setContractAddress(contract.address);
        await post(contract.address);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  

  return (
    <div className=" mx-auto px-12 py-8 ml-auto">
      {show ? null : (
        <ProgressBar target={total} current={current} deadline={end} />
      )}
      {end ? (
        <div className="text-gray-700 font-semibold">End Date: {end}</div>
      ) : null}
      <h1 className="font-bold text-3xl leading-tight text-gray-900 mt-4">
        {product.content.body}
      </h1>
      <p className="font-semibold text-lg leading-relaxed text-black mb-4">
        {shortenAddress(getPublicKeyFromDid(product.creator))}
      </p>
      <p
        style={{ maxWidth: "50%" }}
        className="font-semibold text-lg leading-relaxed text-black mb-4"
      >
        {product.content.data.tagline}
      </p>
      <p
        style={{ maxWidth: "50%" }}
        className="font-semibold text-lg leading-relaxed text-black mb-4"
      >
        {product.content.data.description}
      </p>

      <p className="font-semibold text-lg leading-relaxed text-black mb-4">
        {product.content.data.makers}
      </p>

      <div className="w-1/2">
        <Player playbackId={videoAsset.data.playbackId}></Player>
      </div>
      {show ? (
        <button
          className="bg-red-600 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-xl focus:shadow-outline mt-4 mx-auto"
          onClick={() => setShowInputs(!showInputs)}
        >
          Start Crowdfund
        </button>
      ) : null}

      {showInputs ? (
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Time (in days):
            <input
              className="w-1/4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              onChange={(event) => setDays(event.target.value)}
            />
          </label>
          <br />
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Amount (in ETH):
            <input
              className="w-1/4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              onChange={(event) => setTargetAmount(event.target.value)}
            />
          </label>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Goals seek to acheive from the crowdfund:
            <input
              className="w-1/4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="e.g. Launch a new feature in the product, fund a marketing campaign, etc."
              required
              onChange={(event) => setBody(event.target.value)}
            />
          </label>

          <button
            className="bg-green-600 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-xl focus:shadow-outline mt-4 mx-auto"
            onClick={startFund}
          >
            Launch
          </button>
        </div>
      ) : null}
      <div className="border border-gray-300 rounded-md p-4 mt-12 w-1/2">
        <div className="ml-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <FontAwesomeIcon
              icon={faStar}
              key={star}
              className={` ${
                rating >= star
                  ? "inline-block w-6 h-6 rounded-full text-yellow-500"
                  : "inline-block w-6 h-6 rounded-full text-yellow-200"
              } cursor-pointer`}
              onClick={() => setRating(star)}
            />
          ))}
        </div>
        <input
          type="text"
          placeholder="Write a review"
          className="rounded-md py-2 px-4 block w-3/4 h-auto leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out overflow-hidden text-left"
          onChange={(event) => setReviewValues(event.target.value)}
        />

        <button
          className=" bg-green-600 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-xl focus:shadow-outline mt-4 mx-auto text-xs"
          onClick={issueCredential}
        >
          Submit Review
        </button>
      </div>
      <div className="absolute right-60 top-20">
        {!auth.isAuthenticated ? (
          <button
            className=" bg-red-600 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-xl focus:shadow-outline mt-4 mx-auto text-s"
            onClick={auth.connect}
          >
            Connect to Krebit to view Reviews
          </button>
        ) : (
          <button
            className=" bg-red-600 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-xl focus:shadow-outline mt-4 mx-auto text-s"
            onClick={getIssued}
          >
            Show Reviews
          </button>
        )}

        {credentials.map((credential, index) => {
          console.log(credential);
          return (
            <div
              key={index}
              className="border border-gray-300 rounded-md p-4 mt-12 w-240"
            >
              <div style={{ backgroundImage: `url(${credential.picture})` }}>
                <p>{shortenAddress(getPublicKeyFromDid(credential.did))}</p>

                {[1, 2, 3, 4, 5].map((star) => (
                  <FontAwesomeIcon
                    icon={faStar}
                    key={star}
                    className={` ${
                      credential.review.rating >= star
                        ? "inline-block w-6 h-6 rounded-full text-yellow-500"
                        : "inline-block w-6 h-6 rounded-full text-yellow-200"
                    } cursor-pointer`}
                  />
                ))}
                <p>{credential.review.reviewValues}</p>
              </div>
            </div>
          );
        })}
      </div>
      {show ? null : (
        <div className="border border-gray-300 rounded-md p-4 mt-12 w-1/2">
          <label className=" block text-gray-700 text-sm font-bold mb-2">
            Contribute to this Project
            <input
              className="shadow appearance-none border-gray-900 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Amount in Eth (e.g 0.001)"
              onChange={(event) => setAmount(event.target.value)}
            />
          </label>
          <button
            className="bg-green-600 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-xl focus:shadow-outline mt-4 mx-auto"
            onClick={contribute}
          >
            Contribute
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductPage;

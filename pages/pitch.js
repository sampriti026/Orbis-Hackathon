import { useState, useEffect } from "react";
import { Orbis } from "@orbisclub/orbis-sdk";
import { useCreateAsset } from "@livepeer/react";

let orbis = new Orbis();

export default function App() {
  const [links, setLinks] = useState([""]);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [assetId, setAssetId] = useState();

  const initialValues = {
    name: "",
    tagline: "",
    description: "",
    makers: "",
  };

  const [values, setValues] = useState(initialValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
      website: links,
      video: assetId,
    }));
    console.log(values);
  };

  const handleLinkChange = (event, index) => {
    const newLinks = [...links]; // copy the current links array
    newLinks[index] = event.target.value; // update the value of the link at the specified index
    setLinks(newLinks);
    // set the updated links array as the new state
  };

  const handleAddLink = () => {
    setLinks([...links, ""]); // add a new empty string to the links array and set it as the new state
  };

  const {
    mutate: createAsset,
    data: assets,
    status,
    progress,
    error,
  } = useCreateAsset(
    // we use a `const` assertion here to provide better Typescript types
    // for the returned data
    video
      ? {
          sources: [{ name: video.name, file: video }],
        }
      : null
  );

  const handleUpload = async () => {
    setLoading(true);
    try {
      const asset = await createAsset({ file: video });
      setAssetId(asset);
      console.log("asset", asset);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  /** Calls the Orbis SDK and handle the results */
  async function connect() {
    let res = await orbis.isConnected();
    if (res.status !== 200) {
      console.log("no active status");
      let res = await orbis.connect();
    }

    /** Check if connection is successful or not */
    if (res.status == 200) {
      setUser(res.did);
    } else {
      console.log("Error connecting to Ceramic: ", res);
      alert("Error connecting to Ceramic.");
    }
  }

  async function post() {
    await orbis.isConnected();
    await handleUpload();
    console.log("After");
    let res = await orbis.createPost({
      body: values.name,
      context: "rooter.pitches",
      data: values,
    });

    console.log("res", res);
    if (res.status !== 200) {
      alert("Failed to create post");
    }
  }

  return (
    <div className="mx-auto max-w-sm">
      <h1 className="text-2xl font-bold mb-6">Pitch Your Product</h1>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-lg font-bold mb-4">Product</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="tagline"
          >
            Tagline
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="tagline"
            type="text"
            name="tagline"
            value={values.tagline}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4"></div>
        {links.map((link, index) => (
          <div key={index} className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor={`otherLink-${index}`}
            >
              Link
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id={`link-${index}`}
              type="text"
              name={`link-${index}`}
              value={link}
              onChange={(event) => handleLinkChange(event, index)}
            />
            <button
              type="button"
              onClick={() => {
                const newLinks = [...links];
                newLinks.splice(index, 1);
                setLinks(newLinks);
              }}
              className="mt-2 text-xs bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Remove
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddLink}
          className="text-xs bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Other Link
        </button>
        <div className="mb-4 mt-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="video"
          >
            Video
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="video"
            type="file"
            name="video"
            accept="video/*"
            onChange={(event) => {
              const file = event.target.files[0];
              setVideo(file);
            }}
          />
          {video && (
            <p className="text-base font-medium text-gray-800">
              {video.name} ({Math.round(video.size / 1024 / 1024)} MB)
              <button
                type="button"
                className="bg-red-500 text-white rounded-full w-6 focus:outline-none focus:shadow-outline"
                onClick={(event) => {
                  setVideo(null);
                }}
              >
                &times;
              </button>
            </p>
          )}
          <button
            className="text-xs bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={status === "loading" || !createAsset}
            onClick={() => {
              createAsset?.();
            }}
          >
            Create Asset
          </button>
        </div>
        Asset Name:
        {assets?.map((asset) => (
        <div key={asset.id}>
          <div>
            <div>{asset?.id}</div>
          </div>
        </div>
      ))}


        <h2 className="text-lg font-bold mt-8 mb-4">Description</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
            id="description"
            name="description"
            value={values.description}
            onChange={handleChange}
          />
        </div>
        <h2 className="text-lg font-bold mt-8 mb-4">Makers</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="makers"
          >
            Twitter Handles
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="makers"
            type="text"
            name="makers"
            value={values.makers}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={post}
          >
            Submit
          </button>
        </div>
      </div>

      {error && <div>{error.message}</div>}
    </div>
  );
}

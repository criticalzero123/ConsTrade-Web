import React, { useState } from "react";
import ProductAddDropZone from "../../Components/ProductAdd/ProductAddDropZone";
import ProductAddInput from "../../Components/ProductAdd/ProductAddInput";
import ProductAddSelect from "../../Components/ProductAdd/ProductAddSelect";
import ProductAddTextArea from "../../Components/ProductAdd/ProductAddTextArea";
import { IoCloseCircleOutline } from "react-icons/io5";
import { AiFillInfoCircle } from "react-icons/ai";

import { v4 } from "uuid";

import ProductCardDetails from "../../Components/ProductAdd/ProductCardDetails.jsx/ProductCardDetails";

// For the Options
import {
  addHookSelect,
  categoryOptions,
  checkImageLimitSize,
  conditionOptions,
  meetupPreferenceOptions,
  platformOptions,
  preferTradeOptions,
} from "../../service/productService";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../actions/productActions";
import { userInfo } from "../../service/userService";
import { saveImageStorage } from "../../firebase/storageImages";
import { Button, Spinner, Tooltip } from "flowbite-react";
import {
  arrayUnion,
  doc,
  getDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { useEffect } from "react";
import { getFollowers } from "../../actions/followActions";

const ProductAdd = () => {
  const user = userInfo();
  const [visibleOtherPlatform, setVisibleOtherPlatform] = useState(false);
  const [cashTradeInVisible, setCashTradeInVisible] = useState(false);
  const [itemTradeInVisible, setItemTradeInVisible] = useState(false);
  const [itemList, setItemList] = useState([]);
  //   Select
  const [category, setCategory] = useState([]);
  const [platform, setPlatform] = useState([]);
  const [condition, setCondition] = useState(conditionOptions[0]);
  const [prefer, setPrefer] = useState(preferTradeOptions[0]);
  const [meetup, setMeetup] = useState(meetupPreferenceOptions[0]);
  //   TextInput
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [cash, setCash] = useState(0);
  const [item, setItem] = useState("");
  const [modelNumber, setModelNumber] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [otherPlatform, setOtherPlatform] = useState("");
  //   Textarea
  const [description, setDescription] = useState("");
  //   dropzone
  const [imageUpload, setImageUpload] = useState([]);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFollowers(user._id));
  }, [dispatch, user._id]);

  const { followers } = useSelector((state) => state.getFollowersReducer);

  const cashPreferInput = (e) => {
    if (e.target.value >= 0) {
      setCash(e.target.value);
    }
  };

  const addPlatform = (e) => {
    e.preventDefault();
    if (e.target.value !== "Others...") {
      setVisibleOtherPlatform(false);
      addHookSelect(e.target.value, platform, setPlatform);
    }

    if (e.target.value === "Others...") {
      setVisibleOtherPlatform(true);
    }
  };

  const addingItemTradeIn = () => {
    setItemTradeInVisible(true);
    if (itemList.length >= 5) {
      alert("Sorry, you cannot put more than 5 item");
      return;
    }

    const exist = itemList.find(
      (_item) => _item.toLowerCase() === item.toLowerCase()
    );

    if (exist) {
      alert("Item Already Exist");
      return;
    }

    if (item !== "" && itemList.length < 5) {
      setItemList([...itemList, item]);
      setItem("");
    }
  };

  const onDeleteItemList = (value) => {
    setItemList(itemList.filter((_item) => _item !== value));
  };

  const addPicture = (e) => {
    const imageInfo = e.target.files[0];

    if (imageInfo === undefined) return;

    const imageChecker = checkImageLimitSize(imageInfo, 4);

    if (imageChecker) {
      setImageUpload([...imageUpload, imageInfo]);
    } else {
      alert("Sorry, you cannot upload more than 4mb.");
    }
  };

  const onDeletePic = (image) => {
    const newArrayImages = imageUpload.filter((images) => images !== image);

    setImageUpload(newArrayImages);
  };
  const productAddRequest = async (e) => {
    e.preventDefault();

    if (category.length === 0) alert("Please choose category of the item");
    else if (platform.length === 0) alert("Please choose platform of the item");
    else if (prefer === "Selling" && cash === 0) {
      alert("Please input cash amount");
    } else if (imageUpload != null && imageUpload.length !== 0) {
      setLoading(true);
      await saveImageStorage(imageUpload, title, user, productUploadCallBack);
    } else {
      alert("Please Provide Picture");
    }
  };

  const productUploadCallBack = async (image) => {
    if (image) {
      const product = {
        userId: user._id,
        name: user.name,
        title: title,
        description: description,
        location: location,
        category: category.toString(),
        platform: platform.toString(),
        modelNumber: modelNumber,
        serialNumber: serialNumber,
        condition: condition,
        imageURL: image[0],
        imageListURL: image,
        preferTrade: prefer,
        cash: parseInt(cash),
        item: prefer === "Swapping" ? item : itemList.toString(),
        deliveryType: meetup,
      };

      if(followers !== undefined || followers.length > 0){
      // Sending notifications
      for (let i = 0; i < followers.length; i++) {
        const _tempUser = followers[i];
        const res = await getDoc(
          doc(db, "userNotification", _tempUser.userUid)
        );
        await updateDoc(doc(db, "userNotification", _tempUser.userUid), {
          notifications: arrayUnion({
            id: v4(),
            senderId: user.uid,
            sender_Id: user._id,
            senderName: user.name,
            message: "posted an item.",
            imagePhotoURL: user.imagePhotoURL,
            status: "unread",
            notifType: "addproduct",
            dateCreated: Timestamp.now(),
          }),

          totalUnread: res.data().totalUnread + 1,
        });
      }
      dispatch(addProduct(product));
      }
    } else {
      alert("Something went wrong in adding the product. ");
    }
  };
  return (
    <div className="container mx-auto px-0 lg:px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 pt-7 px-5">
        <section>
          <form onSubmit={productAddRequest}>
            <aside className="overflow-y-auto h-[45rem] ">
              <ProductAddInput
                labeltext="Item Name"
                placeholdertext="name..."
                value={title}
                fortext="title"
                onChange={(e) => setTitle(e.target.value)}
                required={true}
              />
              <br />

              <ProductAddSelect
                required={true}
                items={categoryOptions}
                flagCategory={true}
                labeltext="Category"
                width="w-32"
                onChange={(e) =>
                  addHookSelect(e.target.value, category, setCategory)
                }
              />

              {/* list of category */}
              <div className="block">
                {category.length !== 0 && (
                  <div className="flex flex-wrap ">
                    {category.map((value) => (
                      <div
                        key={value}
                        className="py-1 px-3 rounded-lg mt-3 mr-3 bg-[rgba(0,0,0,0.1)] place-items-center flex "
                      >
                        {value}
                        <IoCloseCircleOutline
                          className="ml-3 cursor-pointer"
                          size={20}
                          onClick={() =>
                            addHookSelect(value, category, setCategory)
                          }
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <br />
              <div className="flex">
                <ProductAddSelect
                  required={true}
                  items={platformOptions}
                  flagCategory={true}
                  labeltext="Platform Supported"
                  width="w-32"
                  onChange={addPlatform}
                />{" "}
                <span className="ml-1 mt-1">
                  <Tooltip
                    content={
                      <>
                        <p>Choose the platform supported in your game.</p>
                        <p className="text-gray-300">
                          For more information click{" "}
                          <span
                            className="text-orange-500 hover:cursor-pointer"
                            onClick={() => window.open("/home", "_blank")}
                          >
                            Here!
                          </span>
                        </p>
                      </>
                    }
                    trigger={"hover"}
                  >
                    <AiFillInfoCircle className="cursor-pointer text-gray-400" />
                  </Tooltip>
                </span>
              </div>
              {visibleOtherPlatform && (
                <div className="flex place-items-center mt-3 cursor-pointer ">
                  <input
                    className=" text-sm rounded-lg block w-full p-2.5 bg-gray-800 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Input platform..."
                    onChange={(e) => setOtherPlatform(e.target.value)}
                    value={otherPlatform}
                  />
                  <span
                    className="ml-3 rounded  px-5 py-1 border-2 border-gray-800 hover:bg-gray-800 hover:text-white"
                    onClick={() => {
                      addHookSelect(otherPlatform, platform, setPlatform);
                      setOtherPlatform("");
                    }}
                  >
                    Add
                  </span>
                </div>
              )}
              {/* list of platform */}
              <div className=" w-full ">
                {platform.length !== 0 && (
                  <div className="flex flex-wrap">
                    {platform.map((value) => (
                      <div
                        key={value}
                        className="py-1 px-3 rounded-lg mr-3  mt-3 bg-[rgba(0,0,0,0.1)] place-items-center flex "
                      >
                        {value}
                        <IoCloseCircleOutline
                          className="ml-3 cursor-pointer"
                          size={20}
                          onClick={() =>
                            addHookSelect(value, platform, setPlatform)
                          }
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <br />
              <ProductAddInput
                labeltext="Model Name"
                placeholdertext="(Optional)"
                value={modelNumber}
                fortext="modelnumber"
                onChange={(e) => setModelNumber(e.target.value)}
              />
              <br />
              <ProductAddInput
                labeltext="Serial Number"
                placeholdertext="xxx-xxxx"
                value={serialNumber}
                fortext="serialnumber"
                onChange={(e) => setSerialNumber(e.target.value)}
                required={true}
              />
              <br />
              <ProductAddSelect
                flagCategory={false}
                items={conditionOptions}
                labeltext="Condition"
                width="w-40"
                onChange={(e) => setCondition(e.target.value)}
              />
              <br />
              <ProductAddTextArea
                labeltext="Description"
                fortext="description"
                placeholdertext="Describe the item (Dents or Defects)"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                required={true}
              />
              <br />
              <ProductAddInput
                labeltext="Location"
                placeholdertext="Cebu City..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                fortext="location"
                required={true}
              />
              <br />
              <ProductAddDropZone
                labeltext="Add Picture"
                onChange={addPicture}
                count={imageUpload.length}
              />
              {imageUpload.length !== 0 && (
                <div className="flex lg:hidden mt-5">
                  {imageUpload.map((image, index) => (
                    <div
                      key={index}
                      className="relative mr-3 flex place-items-center h-28 w-20 bg-gray-100"
                    >
                      <img
                        src={window.URL.createObjectURL(image)}
                        alt={image.name}
                        className="h-full w-full object-contain "
                      />
                      <div className="absolute top-0 right-0">
                        <IoCloseCircleOutline
                          size={25}
                          className="text-[#dfdfdf] cursor-pointer"
                          onClick={() => onDeletePic(image)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <br />
              <ProductAddSelect
                flagCategory={false}
                labeltext="Prefer Trade"
                fortext="trade"
                items={preferTradeOptions}
                width="w-40"
                onChange={(e) => {
                  setCash(0);
                  setItemList([]);
                  setItem("");
                  setCashTradeInVisible(false);
                  setItemTradeInVisible(false);
                  setPrefer(e.target.value);
                }}
              />
              {prefer === "Trade-in" && (
                <div className="mt-2">
                  <div
                    className="hover:text-orange-500 hover:cursor-pointer max-w-fit"
                    onClick={() => {
                      setCash(0);
                      setCashTradeInVisible(!cashTradeInVisible);
                    }}
                  >
                    <span>{!cashTradeInVisible ? "+" : "-"}</span> Cash
                  </div>
                  <div
                    className="hover:text-orange-500 hover:cursor-pointer max-w-fit"
                    onClick={addingItemTradeIn}
                  >
                    + Item
                  </div>
                </div>
              )}
              <ProductAddInput
                labeltext="Cash Prefer"
                fortext="cash"
                placeholdertext="0"
                onChange={cashPreferInput}
                value={cash}
                hidden={
                  prefer === "Selling" || cashTradeInVisible ? false : true
                }
                number={true}
              />
              <ProductAddInput
                labeltext="Item Prefer"
                fortext="Item"
                placeholdertext="something..."
                value={item}
                onChange={(e) => setItem(e.target.value)}
                hidden={
                  prefer === "Swapping" || itemTradeInVisible ? false : true
                }
              />
              {/* list of items */}
              <div className=" w-full ">
                {itemList.length !== 0 && prefer === "Trade-in" && (
                  <div className="flex flex-wrap">
                    {itemList.map((value) => (
                      <div
                        key={value}
                        className="py-1 px-3 rounded-lg mr-3  mt-3 bg-[rgba(0,0,0,0.1)] place-items-center flex "
                      >
                        {value}
                        <IoCloseCircleOutline
                          className="ml-3 cursor-pointer"
                          size={20}
                          onClick={() => onDeleteItemList(value)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <br />
              <ProductAddSelect
                flagCategory={false}
                labeltext="Mode of Transaction"
                items={meetupPreferenceOptions}
                width="w-42"
                onChange={(e) => setMeetup(e.target.value)}
              />
              <br />
              <br />
            </aside>

            <div className="mt-5 flex justify-center">
              <Button
                gradientDuoTone="cyanToBlue"
                type="submit"
                disabled={loading ? true : false}
              >
                <div className="w-96 flex justify-center text-lg">
                  {loading && (
                    <div className="mr-3">
                      <Spinner size="md" light={true} />
                    </div>
                  )}
                  Add
                </div>
              </Button>
            </div>
          </form>
        </section>
        <div className="lg:col-span-2 hidden lg:block">
          <ProductCardDetails
            title={title}
            description={description}
            condition={condition}
            category={category.toString()}
            platform={platform.toString()}
            location={location}
            preferTrade={prefer}
            cash={cash}
            modelNumber={modelNumber}
            serialNumber={serialNumber}
            item={prefer === "Swapping" ? item : itemList.toString()}
            meetup={meetup}
            image={imageUpload}
            itemTradeInVisible={itemTradeInVisible}
            cashTradeInVisible={cashTradeInVisible}
            userPhoto={user.imagePhotoURL}
            userName={user.name}
            onDeletePicture={onDeletePic}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductAdd;

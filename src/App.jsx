import React, { useEffect, useState } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { RouterProvider, useRouter } from "./router/RouteStack";
import { ROLES } from "./data/mock";

// Pages
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ProductDetail from "./pages/ProductDetail";
import OrderDetail from "./pages/OrderDetail";
import OrderManagement from "./pages/OrderManagement";
import TransferLanding from "./pages/TransferLanding";
import CreateGroupBuy from "./pages/CreateGroupBuy";
import RealNameVerification from "./pages/RealNameVerification";
import ProfileEdit from "./pages/ProfileEdit";
import PaymentSettings from "./pages/PaymentSettings";
import AccountSecurity from "./pages/AccountSecurity";
import CreatePost from "./pages/CreatePost";
import PostDetail from "./pages/PostDetail";
import ContractSigning from "./pages/ContractSigning";
import LeaderProfile from "./pages/LeaderProfile";
import MerchantProfile from "./pages/MerchantProfile";
import MyGroupBuys from "./pages/MyGroupBuys";
import MyOrders from "./pages/MyOrders";
import PublicUserProfile from "./pages/PublicUserProfile";
import MyFollowing from "./pages/MyFollowing";
import MyLikes from "./pages/MyLikes";
import MyAlbum from "./pages/MyAlbum";
import GroupBuyManagement from "./pages/GroupBuyManagement";
import GroupBuyDetail from "./pages/GroupBuyDetail";
import ShippingManagement from "./pages/ShippingManagement";
import MyContracts from "./pages/MyContracts";
import AddressManagement from "./pages/AddressManagement";
import MyDolls from "./pages/MyDolls";
import DollProfile from "./pages/DollProfile";
import AchievementCenter from "./pages/AchievementCenter";
import KnowledgeBase from "./pages/KnowledgeBase";
import SkinMatchStudio from "./pages/SkinMatchStudio";
import UserShop from "./pages/UserShop"; // Keeping for legacy reference or sub-view
import WishPool from "./pages/WishPool";
import CreateSpotProduct from "./pages/CreateSpotProduct";
import SpotProductManagement from "./pages/SpotProductManagement";
import SearchPage from "./pages/SearchPage";
import ArtistHub from "./pages/ArtistHub"; // Keeping for legacy
import CreateRequirement from "./pages/CreateRequirement";
import RequirementDetail from "./pages/RequirementDetail";
import ArtistProfile from "./pages/ArtistProfile";
import MerchantApply from "./pages/MerchantApply";
import LeaderApply from "./pages/LeaderApply";
import ArtistApply from "./pages/ArtistApply";

// Guzi Platform Pages (New)
import SecondHandMarket from "./pages/SecondHandMarket";
import CreateSecondHandListing from "./pages/CreateSecondHandListing";
import BarterSquare from "./pages/BarterSquare";
import CreateBarterRequest from "./pages/CreateBarterRequest";
import MyCollections from "./pages/MyCollections";

// Extracted Components
import UserProfile from "./pages/UserProfile";
import Square from "./pages/Square";
import LeaderDashboard from "./pages/LeaderDashboard";
import Messages from "./pages/Messages";
import TabBar from "./components/TabBar";

const MainApp = () => {
  const { currentRoute, replace } = useRouter();
  const { currentUser, notifications } = useApp();
  const [activeTab, setActiveTab] = useState("shop");

  // Redirect to Login if no user (initial load)
  useEffect(() => {
    if (!currentUser) {
      replace("Login");
    } else {
      // Set default tab based on role
      if (currentUser.role === ROLES.LEADER) setActiveTab("home");
      else setActiveTab("shop");
    }
  }, [currentUser]); // Run when currentUser changes

  // Render current screen based on RouteStack
  const renderScreen = () => {
    switch (currentRoute.name) {
      case "Login":
        return <Login />;
      case "ForgotPassword":
        return <ForgotPassword />;
      case "ProductDetail":
        return <ProductDetail />;
      case "OrderDetail":
        return <OrderDetail />;
      case "OrderManagement":
        return <OrderManagement />;
      case "CreateGroupBuy":
        return <CreateGroupBuy />;
      case "TransferLanding":
        return <TransferLanding />;
      case "RealNameVerification":
        return <RealNameVerification />;
      case "ProfileEdit":
        return <ProfileEdit />;
      case "PaymentSettings":
        return <PaymentSettings />;
      case "AccountSecurity":
        return <AccountSecurity />;
      case "CreatePost":
        return <CreatePost />;
      case "PostDetail":
        return <PostDetail />;
      case "ContractSigning":
        return <ContractSigning />;
      case "LeaderProfile":
        return <LeaderProfile />;
      case "MerchantProfile":
        return <MerchantProfile />;
      case "MyGroupBuys":
        return <MyGroupBuys />;
      case "MyOrders":
        return <MyOrders params={currentRoute.params} />;
      case "PublicUserProfile":
        return <PublicUserProfile />;
      case "MyFollowing":
        return <MyFollowing />;
      case "MyLikes":
        return <MyLikes />;
      case "MyAlbum":
        return <MyAlbum />;
      case "GroupBuyManagement":
        return <GroupBuyManagement />;
      case "GroupBuyDetail":
        return <GroupBuyDetail />;
      case "ShippingManagement":
        return <ShippingManagement />;
      case "MyContracts":
        return <MyContracts />;
      case "AddressManagement":
        return <AddressManagement />;
      case "MyDolls":
        return <MyDolls />;
      case "DollProfile":
        return <DollProfile />;
      case "AchievementCenter":
        return <AchievementCenter />;
      case "KnowledgeBase":
        return <KnowledgeBase />;
      case "SkinMatchStudio":
        return <SkinMatchStudio />;
      case "WishPool":
        return <WishPool />;
      case "CreateSpotProduct":
        return <CreateSpotProduct />;
      case "SpotProductManagement":
        return <SpotProductManagement />;
      case "SearchPage":
        return <SearchPage />;
      case "ArtistHub":
        return <ArtistHub />;
      case "CreateRequirement":
        // Redirect legacy route to unified publisher
        return <CreateSecondHandListing />;
      case "RequirementDetail":
        return <RequirementDetail />;
      case "ArtistProfile":
        return <ArtistProfile />;
      case "MerchantApply":
        return <MerchantApply />;
      case "LeaderApply":
        return <LeaderApply />;
      case "ArtistApply":
        return <ArtistApply />;

      // New Routes
      case "SecondHandMarket":
        return <SecondHandMarket />;
      case "CreateSecondHandListing":
        return <CreateSecondHandListing />;
      case "BarterSquare":
        return <BarterSquare />;
      case "CreateBarterRequest":
        // Redirect legacy route to unified publisher
        return <CreateSecondHandListing />;
      case "MyCollections":
        return <MyCollections />;

      case "Home":
      default:
        // Tab View
        return (
          <div className="flex flex-col h-full bg-gray-50">
            <div className="flex-1 overflow-y-auto scrollbar-hide">
              {activeTab === "shop" && <SecondHandMarket />}
              {activeTab === "home" && <LeaderDashboard />}
              {/* {activeTab === "exchange" && <BarterSquare />} Deprecated - Merged into Market */}
              {activeTab === "me" && <UserProfile />}
              {activeTab === "square" && <Square />}
              {activeTab === "messages" && <Messages />}
            </div>
            <TabBar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              role={currentUser?.role || ROLES.USER}
            />
          </div>
        );
    }
  };

  return (
    <div className="max-w-md mx-auto h-screen bg-gray-50 shadow-2xl overflow-hidden relative font-sans text-gray-900 flex flex-col">
      {renderScreen()}

      {/* Notifications Toast */}
      <div className="fixed top-4 left-0 right-0 z-50 flex flex-col items-center gap-2 pointer-events-none">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="bg-gray-900/90 text-white px-4 py-2 rounded-full text-sm shadow-lg animate-in fade-in slide-in-from-top-5"
          >
            {n.msg}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <RouterProvider>
        <MainApp />
      </RouterProvider>
    </AppProvider>
  );
}

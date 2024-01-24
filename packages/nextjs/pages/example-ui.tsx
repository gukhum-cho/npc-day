import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import BackgroundImageWrapper from "~~/components/BackgroundImageWrapper";
import { ContractData } from "~~/components/example-ui/ContractData";
import { ContractInteraction } from "~~/components/example-ui/ContractInteraction";
import { BossImage } from "~~/components/example-ui/BossImage";
import UserField from "~~/components/example-ui/UserField";


const ExampleUI: NextPage = () => {
  return (
    <div className={`bg-[url('/assets/combat-background.png')] bg-fixed h-full bg-cover bg-center flex flex-col flex-grow`}>
      <MetaHeader
        title="Example UI | Scaffold-ETH 2"
        description="Example UI created with 🏗 Scaffold-ETH 2, showcasing some of its features."
      >
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </MetaHeader>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow:1 }}>
        <div className='flex' style={{ flex: 1, width:'100%', justifyContent:'center'}}>
            {/* Boss image goes here */}
            <BossImage />
            
        </div>
        <div style={{display:'flex', justifyContent:'center', width: '100%', textAlign: 'center', }}>
            <UserField />
        </div>
      </div>
      {/* <div className="grid lg:grid-cols-2 flex-grow" data-theme="exampleUi">
        <ContractInteraction />
        <ContractData />
      </div> */}
    </div>
  );
};

export default ExampleUI;

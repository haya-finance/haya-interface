import { Avatar, Card, CardActionArea, CardContent, CardHeader, Chip, Grid, IconButton, Stack, Typography } from '@mui/material';
import cobo from 'assets/images/bots/cobo.png';
import safe from 'assets/images/bots/Safe.png';
import castle from 'assets/images/bots/castle.png';
import spark from 'assets/images/bots/spark_webclip.png';
import dhedge from 'assets/images/bots/dhedge.png';
import { Image } from 'antd';
import { CiCircleInfo, CiShare2, CiBookmark } from 'react-icons/ci';

type Data = {
  img: string;
  title: string;
  text: string;
  button_text: string[];
};
const BotsList = () => {
  const data: Data[] = [
    {
      img: cobo,
      title: 'Cobo Safe App',
      text: 'Teams role-based access control, parameter-level risk management for smart contract invocation.',
      button_text: ['CeFi', 'DeFi', 'Insitutional']
    },
    {
      img: safe,
      title: 'Safe{DAO} Governance',
      text: 'The portal to Safe{DAO} governance, voting power delegation and allocation claiming',
      button_text: ['DAO Tooling', 'Governance']
    },
    {
      img: castle,
      title: 'OxNFTs by Castle',
      text: 'NFT Marketplace Aggregator:Buy, list and transfer NFTs across OpenSea and all major markets.',
      button_text: ['Collectibles / NFTs', 'Marketplace']
    },
    {
      img: spark,
      title: 'Spark',
      text: 'Maker-Powered Lending Market',
      button_text: ['DeFi']
    },
    {
      img: dhedge,
      title: 'dHEDGE',
      text: 'Decentralized asset management',
      button_text: ['Deahboard', 'DeFi']
    }
  ];

  return (
    <>
      {data.map((item, index) => {
        return (
          <Grid item xs={12} sm={6} m={2} lg={3} mt={8}>
            <Card key={index} sx={{ height: 300 }}>
              <CardActionArea>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: '#fff', width: 40, height: 40 }} aria-label="recipe">
                      <Image src={item.img}></Image>
                    </Avatar>
                  }
                  action={
                    <>
                      <IconButton aria-label="info">
                        <CiCircleInfo />
                      </IconButton>
                      <IconButton aria-label="info">
                        <CiShare2 />
                      </IconButton>
                      <IconButton aria-label="info">
                        <CiBookmark />
                      </IconButton>
                    </>
                  }
                />
                <CardContent>
                  <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                      <Typography variant="h5" textAlign="left" mb={2}>
                        {item.title}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h5" textAlign="left" mb={2} sx={{ color: 'text.secondary' }}>
                        {item.text}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Stack direction="row" spacing={1}>
                        {item.button_text.map((i, index) => {
                          return <Chip label={i} key={index} />;
                        })}
                      </Stack>
                    </Grid>
                  </Grid>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        );
      })}
    </>
  );
};

export default BotsList;

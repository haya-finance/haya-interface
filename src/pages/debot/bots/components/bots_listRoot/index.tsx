import { Avatar, Card, CardActionArea, CardContent, CardHeader, Chip, Grid, IconButton, Stack, Typography } from '@mui/material';
import finance from 'assets/images/bots/Finance.png';
import splits from 'assets/images/bots/0xSplits.png';
import castle from 'assets/images/bots/castle.png';
import inch from 'assets/images/bots/1inch.png';
import aave from 'assets/images/bots/aave.png';
import aelin from 'assets/images/bots/Aelin.png';
import { Image } from 'antd';
import { CiCircleInfo, CiShare2, CiBookmark } from 'react-icons/ci';

type Data = {
  img: string;
  title: string;
  text: string;
  button_text: string[];
};
const AllBotsList = () => {
  const data: Data[] = [
    {
      img: castle,
      title: 'OxNFTs by Castle',
      text: 'NFT Marketplace Aggregator:Buy, list and transfer NFTs across OpenSea and all major markets.',
      button_text: ['Collectibles / NFTs', 'Marketplace']
    },
    {
      img: finance,
      title: '0xPlasma Finance',
      text: 'Cross-chain DeFi & DEX aggregator, farming,asset management, fiat on-ramp',
      button_text: ['Dashboard', 'DeFi', 'DEX']
    },
    {
      img: splits,
      title: '0xSplits',
      text: '0xSplits is a decentralized protocol for trustlessly sharing onchain income',
      button_text: ['DAO Tooling', 'DeFi', 'Infrastructure']
    },
    {
      img: inch,
      title: '1inch',
      text: 'The most effcient defi aggregator',
      button_text: ['Aggregator', 'DeFi', 'DEX']
    },
    {
      img: aave,
      title: 'Aave v3',
      text: 'Non-custodial liquidity protocol',
      button_text: ['DeFi', 'Lending/Borrowing']
    },
    {
      img: aelin,
      title: 'Aelin',
      text: 'A permissionless multi-chain protocol for capital raises and OTC deais No need fro VC',
      button_text: ['DeFi', 'Fundraising']
    }
  ];

  return (
    <>
      {data.map((item, index) => {
        return (
          <Grid item xs={12} sm={6} lg={3} mt={2} mr={1} sx={{ maxWidth: '100%' }}>
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
                      <Typography variant="h5" textAlign="left" mb={2} alignItems="">
                        {item.title}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h5" textAlign="left" mb={2} alignItems="" sx={{ color: 'text.secondary' }}>
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

export default AllBotsList;

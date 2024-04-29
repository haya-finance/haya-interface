

// material-ui
import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Stack, Typography } from '@mui/material';
import Read_one from 'assets/homeConnect/read1.png';
import Read_two from 'assets/homeConnect/read2.png';
import Read_three from 'assets/homeConnect/read3.png';
import Read_four from 'assets/homeConnect/read4.png'




// third party

// assets

// ==============================|| LANDING - HEADER PAGE ||============================== //


type ReadType = {
  picture: string;
  title: string;
  text: string;
}

type PropsType = {
  windowWidth: number
}


const ReadPage = ({ windowWidth }: PropsType) => {


  const Reads: ReadType[] = [
    {
      picture: Read_one,
      title: 'Haya Blog Title 01',
      text: 'Lorem ipsum dolor sit amet consectetur. Velit elit sapien blandit tempus id arcu. Vel odio nisi sed sed.'
    },
    {
      picture: Read_two,
      title: 'Haya Blog Title 02',
      text: 'Lorem ipsum dolor sit amet consectetur. Velit elit sapien blandit tempus id arcu. Vel odio nisi sed sed.'
    },
    {
      picture: Read_three,
      title: 'Haya Blog Title 03',
      text: 'Lorem ipsum dolor sit amet consectetur. Velit elit sapien blandit tempus id arcu. Vel odio nisi sed sed.'
    },
    {
      picture: Read_four,
      title: 'Haya Blog Title 04',
      text: 'Lorem ipsum dolor sit amet consectetur. Velit elit sapien blandit tempus id arcu. Vel odio nisi sed sed.'
    }
  ]

  return (
    <Box>

      <Stack sx={windowWidth >= 600 ? { width: '100%' } : { width: `${windowWidth - 32}px` }}>
        <Box>
          <Typography variant="body1" textAlign="start" sx={{ color: '#000', fontWeight: 700, ml: 1.5, mt: 4, mb: 1 }}  >
            Read
          </Typography>
          {/* <Stack direction={{ xs: 'column', sm: 'row' }}
            spacing={1} flexWrap="wrap"> */}
          <Grid container spacing={1} >
            {
              Reads.map((item, index) => {
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Card key={index}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="150px"
                          image={item.picture}
                        />
                        <CardContent sx={{ padding: '17px' }}>
                          <Typography gutterBottom variant="h5" component="div">
                            {item.title}
                          </Typography>
                          <Box sx={{ height: '43px', width: '100%', color: "#464646", overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                            {item.text}
                          </Box>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                )
              })
            }
          </Grid>

          {/* </Stack> */}


        </Box>
      </Stack >
    </Box >
  );
};

export default ReadPage;

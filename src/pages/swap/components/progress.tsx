import { Box, CircularProgress, circularProgressClasses, CircularProgressProps } from "@mui/material"

const Progress = (props: CircularProgressProps) => {
  return (
    <Box sx={{ position: 'relative', width: '60px', margin: '0 auto' }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: 'rgba(155, 155, 155, 0.3)',

        }}
        size={60}
        thickness={6}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: '#1aae70',
          // animationDuration: '550ms',
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
            strokeDasharray: '30px, 212px'
          },
        }}
        size={60}
        thickness={6}
        {...props}
      />

    </Box>
  )
}

export default Progress
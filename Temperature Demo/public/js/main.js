var pubnub = PUBNUB.init({
  publish_key: 'pub-c-2b7387b6-1437-42bf-adbd-3f1ffa7c60b2',
  subscribe_key: 'sub-c-f452e206-db80-11e5-aff5-02ee2ddab7fe'
});

var channel = 'Channel-60cjd1c0y';

eon.chart({
  channel: channel,
  generate: {
    bindto: '#temp',
    data: {
      type: 'line',
      colors: {
        temperature: '#663399'
      }
    },
    axis: {
      x: {
        type: 'timeseries',
        tick: {
          format: '%H:%m:%S',
          fit: true
        },
        label: {
          text: 'Time',
        }
      },
      y: {
        label: {
          text: 'Celsius',
          position: 'outer-middle'
        },
        tick: {
          format: function (d) {
            var df = Number( d3.format('.2f')(d) );
            return df;
          }
        }
      }
    }
  },
  pubnub: pubnub,
  limit: 30,
  transform: function(m) {
    return { eon: {
      temperature: m.eon.temperature
    }}
  }
});
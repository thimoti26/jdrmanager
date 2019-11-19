
/** Application object. */
var app = {};

/** User name (you can change this, must be at least 10 characters). */
app.user = 'zbboEmKoykZacXiZpy-D1W39yAkA2yuOGWIJF55p';

/** Default light. */
app.lightId = 2;

/** IP-address of the Hue Bridge. */
app.bridgeIP = '192.168.1.10';

/**
 * Define colors that the lights can be configured with.
 * The colour buttons are set to these colours.
 */
app.hueColors = {};
app.hueColors.jour = {"hue":65500,  "bri":100, "sat":250};
app.hueColors.taverne = {"hue":10000, "bri":75, "sat":250};
app.hueColors.caverne = {"hue":30000, "bri":75, "sat":250};

app.selectLight = function(lightId)
{
    app.lightId = lightId;
};

app.lightOn = function()
{
    app.lightSetState(app.lightId, {"on":true});
};

app.lightOff = function()
{
    app.lightSetState(app.lightId, {"on":false});
};

app.convert =function (red, green, blue)
{
    var X = red * 0.649926 + green * 0.103455  + blue * 0.197109;
    var Y = red * 0.234327  + green * 0.743075  + blue * 0.022598;
    var Z = red * 0.0000000 + green * 0.053077 + blue * 1.035763;

    var x = X / (X + Y + Z);
    var y = Y / (X + Y + Z);
    return {'xy': [x, y]};
}

app.lightsSetColorJour = function()
{
    console.info(app.hueColors.jour)
    // app.lightSetState(1, app.hueColors.jour);
    app.lightSetState(1, app.convert(255, 255, 100));
    // app.lightSetState(2, app.hueColors.jour);
    // app.lightSetState(3, app.hueColors.jour);
};

app.lightsSetColorTaverne = function()
{
    app.lightSetState(1, app.hueColors.taverne);
    app.lightSetState(1, app.convert(0, 255, 255));
};

app.lightsSetColorCaverne = function()
{
    app.lightSetState(1, app.hueColors.caverne);
    app.lightSetState(1, app.convert(255, 0, 0));
    // app.lightSetState(2, app.hueColors.caverne);
    // app.lightSetState(3, app.hueColors.caverne);
};

/**
 * Sets a light's state by sending a request to the Hue Bridge.
 */
app.lightSetState = function(lightId, state)
{
    $.ajax({
        type: 'PUT',
        dataType: 'json',
        url: 'http://' + app.bridgeIP +'/api/' +
            app.user + '/lights/' + lightId + '/state',
        data: JSON.stringify(state),
        success: function(data) { console.log(data)},
        error: function(a, err) {console.log('error ' + err) }
    });
};
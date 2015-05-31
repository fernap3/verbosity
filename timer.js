function Timer(options)
{
	this._options = options;
	this._lastSeconds = null;
}

Timer.prototype = 
{
	Start: function ()
	{
		this._lastSecondsSinceEpoch = Math.floor(new Date().getTime() / 1000);
		this._currentCountdownSeconds = this._options.StartSeconds;
		this._CheckUpdate();
	},
	
	_CheckUpdate: function ()
	{
		var currentSecondsSinceEpoch = Math.floor(new Date().getTime() / 1000);
		
		if (currentSecondsSinceEpoch !== this._lastSecondsSinceEpoch)
		{
			this._currentCountdownSeconds--;
			this._options.UpdateCallback(this._currentCountdownSeconds);
			this._lastSecondsSinceEpoch = currentSecondsSinceEpoch;
		}
		
		if (this._currentCountdownSeconds === 0)
			return;
		
		var thisObj = this;
		
		setTimeout(function() {
			thisObj.CheckUpdate();
		}, 100);
	}
};

(new Timer({
	StartSeconds: 5,
	UpdateCallback: function (seconds)
	{
		console.log(seconds);
	}
})).Start();

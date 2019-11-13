document.addEventListener('DOMContentLoaded', function () {
  'use strict';
  
  chrome.extension.sendRequest({ storage: 'settings' }, function (response) {
    var _enableSetting, _updateSavedSmilies, _addSmiliesRow, _reattachSmiliesListeners,
      settings, setting, smiliesList, checkboxes, addSmileyLink, i;
    
    _enableSetting = function (name) {
        document.querySelector('#' + name + ' h1 input[type=checkbox]').checked = true;
    };
    
    // Settings bootstrap.
    settings = response.storage;
    if (settings === null || typeof settings === 'undefined' || settings === {}) {
		console.log("settings firststeup");
      settings = {
        quickReply: {
          enabled: true
        },
		pcbUsernote: {
          enabled: true
        },
		deleteReason: {
          enabled: true
        },
		dc1: {
          enabled: true
        },
		dc2: {
          enabled: true
        },
		dc3: {
          enabled: true
        },
		dc4: {
          enabled: true
        },
		dc5: {
          enabled: true
        },
		live: {
          enabled: true
        },
		updater: {
          enabled: false
        },
		beeper: {
          enabled: false
        },
		volume: {
          enabled: false
        },
		warnShort: {
          enabled: true
        }
		
		
      };
    }
    		
    // Restore saved settings.
	 if (settings.warnShort.enabled) {
      _enableSetting('warn-short');
    }
    if (settings.quickReply.enabled) {
      _enableSetting('quick-reply');
    }
	 if (settings.pcbUsernote.enabled) {
      _enableSetting('pcb-usernote');
    }
	if (settings.deleteReason.enabled) {
      _enableSetting('delete-reason');
    }
	if (settings.dc1.enabled) {
      _enableSetting('dc1');
    }
	if (settings.dc2.enabled) {
      _enableSetting('dc2');
    }
	if (settings.dc3.enabled) {
      _enableSetting('dc3');
    }
	if (settings.dc4.enabled) {
      _enableSetting('dc4');
    }
	if (settings.dc5.enabled) {
      _enableSetting('dc5');
    }

	if(settings.live == null){
		settings['live']={enabled:true};
	}
	if(settings.updater == null){
		settings['updater']={enabled:false};
	}
	if (settings.live.enabled) {
      _enableSetting('live');
    }
	if (settings.updater.enabled) {
      _enableSetting('updater');
    }
	
	
	if(settings.beeper == null){
		settings['beeper']={enabled:false};
	}
	if (settings.beeper.enabled) {
      _enableSetting('beeper');
    }
	if(settings.volume == null){
		settings['volume']={enabled:false};
	}
	if (settings.volume.enabled) {
      _enableSetting('volume');
    }
	
	
	
	
	chrome.extension.sendRequest({ storage: 'settings', value: settings });
	
	
	
    // Listen for settings changes.
    checkboxes = document.querySelectorAll('input[type=checkbox]');
    for (i = 0; i < checkboxes.length; i++) {
      checkboxes[i].addEventListener('click', function (event) {
        var level, name, checked;
        level = event.target.dataset.level;
        name = event.target.name;
        checked = event.target.checked;
        
        if (typeof settings[level] === 'undefined') {
          settings[level] = {};
        }
        
        if (name === '') {
          settings[level].enabled = checked;
        }
        else {
          settings[level][name] = checked;
        }
        
		//console.log(settings);
  //      localStorage.setItem('settings', JSON.stringify(settings));
        chrome.extension.sendRequest({ storage: 'settings', value: settings });
      });
    };
    
	/*
    // Add the new smiley row when the link is clicked.
    addSmileyLink.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      _addSmiliesRow();
      _reattachSmiliesListeners();
    });
    
    // Remove the given smiley row.
    _reattachSmiliesListeners();
	*/
  });
});
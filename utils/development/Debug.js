const CONFIG = require('../../config/debug.config.json');

class ModelDebug {
    _message;
    _finalMessage;

    _baseColor;
    _resetColor;
    _categoryColor;
    _color;
    _finalColor;

    _type;

    _messageCategory;

    constructor(message) {
        this._message = message;
        this._baseColor = `\x1b[`;
        this._categoryColor = `${this._baseColor}35m${this._baseColor}4m`;
        this._resetColor = `${this._baseColor}0m`;
    }

    create(type) {
        if (!this.ifDebugIsActive(type)) return;
        if (type) this._type = type;
        this.prepareMessage();
        this.sendDebug();
    }

    createCategory() {
        if (!this.ifDebugIsActive()) return;
        this.prepareMessageOfCategory();
        this.sendCategory();
    }

    compositionColor() {
        return this._baseColor + this._color;
    }

    prepareTitleColor() {
        if (this._type) {
            this._color = this.colorOfType;
            this._finalMessage = `  [${this.compositionColor()}${this.titleOfType}${this._resetColor}] `
        }
        else {
            this._color = this.color;
            this._finalMessage = `  [${this.compositionColor()}${this.title}${this._resetColor}] `
        }
    }

    prepareMessage() {
        this.prepareTitleColor();
        this._finalMessage += this._message.replaceAll('$c', this.compositionColor()).replaceAll('$s', this._resetColor);
    }

    prepareMessageOfCategory() {
        this._messageCategory = `\n${this._categoryColor}${this._message} → ${this._resetColor}`;
    }

    sendCategory() {
        console.log(this._messageCategory);
    }

    sendDebug() {
        console.log(this._finalMessage);
    }

    // condition

    ifDebugIsActive(type) {
        if (!CONFIG.status) return false;
        if (type) {
            if (CONFIG[`debug.${type}`] && CONFIG[`debug.${type}`]['status']) return true;
            else return false;
        }
        else return true;
    }

    // getters

    get message() {
        return this._message;
    }

    get config() {
        return CONFIG;
    }

    get title() {
        return CONFIG.title;
    }

    get color() {
        return CONFIG.color;
    }

    get colorOfType() {
        return CONFIG[`debug.${this._type}`].color;
    }

    get titleOfType() {
        return CONFIG[`debug.${this._type}`].title;
    }

    // setters

    set message(newMessage) {
        this._message = newMessage;
    }
}

module.exports = ModelDebug;
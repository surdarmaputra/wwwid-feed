const { draw, create } = require('./dom')


const withStore = (component, store) => (props) => {
	const wrapper = create('div')
	const processChange = () => {
		draw(component(props), wrapper)
	}
	Object.keys(store).map(key => {
		store['_'+key] = store[key]
		Object.defineProperty(store, key, {
			get: function() {
				return this['_'+key]
			},
			set: function(value) {
				this['_'+key] = value
				processChange()
			}
		})
	})
	processChange()
	return wrapper
}

module.exports = {
	withStore
}

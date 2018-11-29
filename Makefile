PROJECT = tip
CSS = tip.css

compile: build/build.js build/build.css

build:
	mkdir -p $@

build/build.js: index.js template.html | build node_modules
	browserify \
		--debug \
		--require query \
		--require ./index.js:$(PROJECT) \
		--outfile build/build.js

build/build.css: $(CSS) | build
	cat $^ > $@

node_modules: package.json
	npm install && touch $@

clean:
	rm -fr build node_modules

test: build build/build.css
	@open test/index.html

.PHONY: clean test compile

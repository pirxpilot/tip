PROJECT = tip
CSS = tip.css

compile: build/build.js build/build.css build/aurora-tip.css

build:
	mkdir -p $@

build/build.js: index.js template.html | build node_modules
	browserify \
		--debug \
		--require ./index.js:$(PROJECT) \
		--outfile build/build.js

build/build.css: $(CSS) | build
	cat $^ > $@

build/aurora-tip.css: | build
	curl \
		--compress \
		--output $@ \
		https://raw.githubusercontent.com/component/aurora-tip/master/aurora-tip.css

node_modules: package.json
	npm install && touch $@

clean:
	rm -fr build node_modules

test: build build/build.css build/aurora-tip.css
	@open test/index.html

.PHONY: clean test compile

var store = [{
        "title": "Getting Ghost onto Github Pages",
        "excerpt":"Ghost seems great. Github Pages seem great. Getting those two together seems so incredibly simple. Oh but guess what, Buster isn’t maintained anymore and it   fails to generate the static version of an basic Ghost blog.Let’s assume that you have a Ghost blog working locally already, and now you’re just trying to deploy to GH pages.There’s a fork of Buster that fixes this problem. Install Buster from that fork (use the –update flag if you already have Buster installed):pip install https://github.com/thinkamabob/buster/archive/master.zip --upgrade  buster generate --domain=https://code.phoffer.com/  Now you can host your blog on Github Pages. Congratulations!","categories": [],
        "tags": [],
        "url": "https://www.paulhoffer.com/2016/02/20/getting-ghost-onto-github-pages.html",
        "teaser":null},{
        "title": "Smoothly upgrade did_you_mean gem for Ruby 2.3",
        "excerpt":"A lot of Rails apps are using the gem did_you_mean to help during development. Most of these apps are probably going to run into an issue when upgrading to Ruby 2.3, which pulled the gem into Ruby core.A graceful method of upgrading Ruby is to update the Gemfile version of did_you_mean to 0.10.0 if it wasn’t already. That version was released 4 months before Ruby 2.3, so some apps may already be using it. Version 0.10.0 works with both 2.3 and previous versions.Fix came from this Github issue","categories": [],
        "tags": ["ruby"],
        "url": "https://www.paulhoffer.com/2016/03/04/smoothly-upgrade-did-you-mean-gem-for-ruby-23.html",
        "teaser":null},{
        "title": "Force git to treat Keynote files as binary",
        "excerpt":"I was recently putting together a repo for presentations I’ve given, and I kept running into an annoying issue. Git would treat my Keynote files as a directory, which ends up looking like this:$ git status...    new file:   presentation.key/Data/st-ED415AB1-F3E3-40E7-AE3C-62C8F48D61F2-1769.jpg    new file:   presentation.key/Data/st-FA2A3A03-7617-4164-9E65-1304161A58D5-2058.jpg    new file:   presentation.key/Metadata/BuildVersionHistory.plist    new file:   presentation.key/Metadata/DocumentIdentifier    new file:   presentation.key/Metadata/Properties.plist    new file:   presentation.key/preview-micro.jpg    new file:   presentation.key/preview-web.jpg    new file:   presentation.key/preview.jpg...I just want the files there as binary, so that anyone can download them if they like.I tried a few different things, including a .gitattributes file with *.key binary, using different versions of git, and even different versions of OS X (el Capitan and Sierra).In the end, the problem was from when I had saved the presentations. The hide file extension option in Keynote’s save dialog was the problem. De-selecting that option is all it took for it to work as I wanted (and as I think most people would expect).","categories": [],
        "tags": ["osx"],
        "url": "https://www.paulhoffer.com/2016/09/21/force-git-to-treat-keynote-files-as-binary.html",
        "teaser":null},{
        "title": "Simple Setup of PostGIS Columns with Phoenix Generators",
        "excerpt":"How to use Phoenix generators with PostGIS column types, with minimal changes to get tests, changesets, and schema working.Requirement: I need to create a schema that includes a PostGIS Point columm.Problem: Phoenix generators are great, but they don’t support special types, such as PostGIS columns.The docs for geo_postgis are sufficient for figuring out how to work with geographic data types, but they don’t cover how to make it work with Phoenix generators, changesets, or tests.Goal: Use Phoenix generators (since contexts are too useful to ignore), and have the generated changesets, views, and tests work with only minor tweaks.How: Use virtual attributes in the Ecto schema to be the bridge to the custom type.      First step is to plan out what type of data you will have, and what primitives it is composed of.    In this case, a Point has 2 floats, representing latitude and longitude. Most interaction will be with the float values instead of the Geo.Point struct. These 2 floats will become virtual attributes to our schema struct.        Use the virtual attributes in our generator.    For a Map context and a locations table, our generator command will look like this:    mix phx.gen.html Map Location locations lng:float lat:float # ... other columns        There are still a few steps before this works and tests are passing. The migration, schema, and tests need updating.        Fix the migration to create the proper column (coordinates).    defmodule MyApp.Repo.Migrations.CreateLocations do  use Ecto.Migration  def change do    create table(:locations) do      # remove the lines for lat/lng. They are commented here to show which lines      # add :lat, :float      # add :lng, :float    end# add the next line, which creates a column `coordinates` on table `locations`    execute(\"SELECT AddGeometryColumn ('locations','coordinates',4326,'POINT',2);\")# add an index if necessary    create index(:locations, [:coordinates], using: :gist)  endend            Update the generated schema:    Find lib/my_app/map/locations.ex to make the lat/lng columns virtual, add the coordinates column, and cast lat/lng to coordinates    defmodule MyApp.Map.Location do  use Ecto.Schema  import Ecto.Changeset  alias MyApp.Map.Location  schema \"locations\" do    field :coordinates, Geo.Point     # add the actual column    field :lng, :float, virtual: true # add the virtual flag here and below    field :lat, :float, virtual: true  end  @doc false  def changeset(%Location{} = location, attrs) do    location    |&gt; cast(attrs, [:lng, :lat])    |&gt; validate_required([:lng, :lat])    |&gt; cast_coordinates()        # remember to cast the coordinates!  end  # something like this to cast the virtual columns to actual column  # it would be good to add validation but I've left it out for brevity  def cast_coordinates(changeset) do    lat = get_change(changeset, :lat)    lng = get_change(changeset, :lng)    geo = %Geo.Point{coordinates: {lng, lat}, srid: 4326}    changeset |&gt; put_change(:coordinates, geo)  endend            Update the generated tests:    Find test/my_app/map/map_test.exs and test/my_app/controllers/location_controller_test.exs. These tests must be updated to check the coordinates attribute instead of lat/lng attributes.    # test/my_app/controllers/location_controller_test.exs   defmodule MyAppWeb.LocationControllerTest do  use MyAppWeb.ConnCase     alias MyApp.Map     @create_attrs %{lat: 60.5, lng: 70.5} # ensure that valid values are used  @update_attrs %{lat: 45.7, lng: 56.7} # ensure that valid values are used  @invalid_attrs %{lat: 200, lng: 200}  # use invalid values here     # ...end        # test/my_app/map/map_test.exs   defmodule MyApp.MapTest do  use MyApp.DataCase     alias MyApp.Map     describe \"locations\" do    alias MyApp.Map.Location       @create_attrs %{lat: 60.5, lng: 70.5} # ensure that valid values are used    @update_attrs %{lat: 45.7, lng: 56.7} # ensure that valid values are used    @invalid_attrs %{lat: 200, lng: 200}  # use invalid values here     # any test checking equality will need to reset the lat/lng attributes  # generated test    test \"list_locations/0 returns all locations\" do      location = location_fixture()      assert Map.list_locations() == [location]    end  # updated test    test \"list_locations/0 returns all locations\" do      location = %{ location_fixture() | lat: nil, lng: nil}      assert Map.list_locations() == [location]    end     # for tests checking values, remove the assertions for lat/lng and add one for `coordinates`  # generated test    test \"create_location/1 with valid data creates a location\" do      assert {:ok, %Location{} = location} = Map.create_location(@valid_attrs)      assert location.lat == 60.5      assert location.lng == 70.5    end  # updated test    test \"create_location/1 with valid data creates a location\" do      assert {:ok, %Location{} = location} = Map.create_location(@valid_attrs)      assert location.coordinates == %Geo.Point{coordinates: {70.5, 60.5}, srid: 4326}    end  end            Run tests. Everything should be passing!    Now go celebrate by adding some real functionality!  ","categories": [],
        "tags": ["elixir","ecto","postgis"],
        "url": "https://www.paulhoffer.com/2018/03/03/simple-setup-of-postgis-columns-with-phoenix-generators.html",
        "teaser":null}]

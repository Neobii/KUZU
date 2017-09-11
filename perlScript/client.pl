#!/usr/bin/perl
use strict;
use warnings;
use v5.010;
use IO::Socket;
use Data::Dumper;


my $server = IO::Socket::INET->new(
    PeerAddr => 'localhost',
    PeerPort => 4444,
    Proto    => 'tcp'
) or die "Can't create client socket: $!";

open FILE, "xmltosend.xml";
my $xml = join('',<FILE>);
if($xml){
	say "Sending File to remote server!";
    say $server $xml;
}
